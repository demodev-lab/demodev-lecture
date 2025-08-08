export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          updated_at: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          bio: string | null
        }
        Insert: {
          id: string
          updated_at?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
        }
        Update: {
          id?: string
          updated_at?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          parent_id: string | null
          order_num: number
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          parent_id?: string | null
          order_num?: number
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          parent_id?: string | null
          order_num?: number
          is_active?: boolean
          created_at?: string
        }
      }
      instructors: {
        Row: {
          id: string
          user_id: string | null
          name: string
          bio: string | null
          avatar_url: string | null
          experience: string | null
          specialties: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          name: string
          bio?: string | null
          avatar_url?: string | null
          experience?: string | null
          specialties?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          name?: string
          bio?: string | null
          avatar_url?: string | null
          experience?: string | null
          specialties?: Json | null
          created_at?: string
        }
      }
      lectures: {
        Row: {
          id: string
          title: string
          subtitle: string | null
          instructor_id: string | null
          description: string | null
          detailed_description: string | null
          thumbnail: string | null
          badge: string | null
          category_id: string | null
          subcategory_id: string | null
          price: number
          discounted_price: number | null
          duration: string | null
          level: 'beginner' | 'intermediate' | 'advanced' | null
          language: string
          rating: number
          review_count: number
          enrolled_count: number
          is_new: boolean
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          subtitle?: string | null
          instructor_id?: string | null
          description?: string | null
          detailed_description?: string | null
          thumbnail?: string | null
          badge?: string | null
          category_id?: string | null
          subcategory_id?: string | null
          price?: number
          discounted_price?: number | null
          duration?: string | null
          level?: 'beginner' | 'intermediate' | 'advanced' | null
          language?: string
          rating?: number
          review_count?: number
          enrolled_count?: number
          is_new?: boolean
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          subtitle?: string | null
          instructor_id?: string | null
          description?: string | null
          detailed_description?: string | null
          thumbnail?: string | null
          badge?: string | null
          category_id?: string | null
          subcategory_id?: string | null
          price?: number
          discounted_price?: number | null
          duration?: string | null
          level?: 'beginner' | 'intermediate' | 'advanced' | null
          language?: string
          rating?: number
          review_count?: number
          enrolled_count?: number
          is_new?: boolean
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      purchases: {
        Row: {
          id: string
          user_id: string
          lecture_id: string
          payment_number: string | null
          payment_date: string
          status: string
          original_price: number | null
          final_amount: number | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          lecture_id: string
          payment_number?: string | null
          payment_date?: string
          status?: string
          original_price?: number | null
          final_amount?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          lecture_id?: string
          payment_number?: string | null
          payment_date?: string
          status?: string
          original_price?: number | null
          final_amount?: number | null
          created_at?: string
        }
      }
      favorites: {
        Row: {
          user_id: string
          lecture_id: string
          created_at: string
        }
        Insert: {
          user_id: string
          lecture_id: string
          created_at?: string
        }
        Update: {
          user_id?: string
          lecture_id?: string
          created_at?: string
        }
      }
    }
  }
}