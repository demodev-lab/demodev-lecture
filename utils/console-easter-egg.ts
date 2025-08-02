export const initConsoleEasterEgg = () => {
  if (typeof window === 'undefined') return;

  // ASCII art for DEMODEV
  const demodevArt = `
██████╗ ███████╗███╗   ███╗ ██████╗ ██████╗ ███████╗██╗   ██╗
██╔══██╗██╔════╝████╗ ████║██╔═══██╗██╔══██╗██╔════╝██║   ██║
██║  ██║█████╗  ██╔████╔██║██║   ██║██║  ██║█████╗  ██║   ██║
██║  ██║██╔══╝  ██║╚██╔╝██║██║   ██║██║  ██║██╔══╝  ╚██╗ ██╔╝
██████╔╝███████╗██║ ╚═╝ ██║╚██████╔╝██████╔╝███████╗ ╚████╔╝ 
╚═════╝ ╚══════╝╚═╝     ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝  ╚═══╝  
`;

  // Clear console and display easter egg
  console.clear();
  
  // Display ASCII art with elegant purple gradient
  console.log(
    '%c' + demodevArt, 
    'color: #8B5CF6; font-family: monospace; font-size: 12px; line-height: 1.2; font-weight: bold;'
  );
};