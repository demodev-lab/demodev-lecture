import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = await createClient();

    // 사용자 인증 확인
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: '인증이 필요합니다.' },
        { status: 401 }
      );
    }

    // 폼 데이터 추출
    const {
      title,
      price,
      duration,
      startDate,
      endDate,
      thumbnailUrl
    } = body;

    // 필수 필드 검증
    if (!title || !price || !duration || !startDate || !endDate || !thumbnailUrl) {
      return NextResponse.json(
        { error: '모든 필수 필드를 입력해주세요.' },
        { status: 400 }
      );
    }

    // 기본 강사 ID (임시로 하드코딩, 나중에 동적으로 설정)
    const defaultInstructorId = '550e8400-e29b-41d4-a716-446655440000';

    // 새 강의 데이터 생성
    const lectureData = {
      title: title.trim(),
      subtitle: '',
      instructor_id: defaultInstructorId,
      description: `${title} 강의입니다.`,
      detailed_description: `${title} 강의에 대한 상세 설명입니다.`,
      thumbnail: thumbnailUrl,
      badge: '',
      category_id: '550e8400-e29b-41d4-a716-446655440001', // 기본 카테고리
      subcategory_id: null,
      price: parseFloat(price.replace(/[^0-9]/g, '')) || 0,
      discounted_price: null,
      duration: duration.trim(),
      rating: 0,
      review_count: 0,
      is_new: true,
      is_active: true
    };

    // Supabase에 강의 저장
    const { data: lecture, error: insertError } = await supabase
      .from('lectures')
      .insert(lectureData)
      .select()
      .single();

    if (insertError) {
      console.error('Database insert error:', insertError);
      return NextResponse.json(
        { error: '강의 저장에 실패했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        message: '강의가 성공적으로 추가되었습니다.',
        lecture 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const supabase = await createClient();

    // 강의 목록 조회
    const { data: lectures, error } = await supabase
      .from('lectures')
      .select(`
        *,
        instructors(name),
        categories(name)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Database query error:', error);
      return NextResponse.json(
        { error: '강의 목록을 불러오는데 실패했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ lectures }, { status: 200 });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}