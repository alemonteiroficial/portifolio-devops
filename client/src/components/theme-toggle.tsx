import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/use-theme';

export default function ThemeToggle() {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative h-10 w-10 hover:bg-purple-100 dark:hover:bg-purple-900/20 transition-colors"
      title={`Alternar para tema ${isDark ? 'claro' : 'escuro'}`}
    >
      <Sun className={`h-5 w-5 transition-all ${isDark ? 'rotate-90 scale-0' : 'rotate-0 scale-100'} text-purple-600`} />
      <Moon className={`absolute h-5 w-5 transition-all ${isDark ? 'rotate-0 scale-100' : '-rotate-90 scale-0'} text-purple-600`} />
      <span className="sr-only">Alternar tema</span>
    </Button>
  );
}