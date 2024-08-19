import ThemeSwitcher from '@/components/ThemeSwitcher';
import UserInfo from '@/components/UserInfo';
import AddPost from '@/components/AddPost';

const Header = () => {
  return (
    <header className="flex items-center justify-between gap-5">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Blog
      </h1>
      <div className="flex items-center gap-5">
        <AddPost />
        <ThemeSwitcher />
        <UserInfo />
      </div>
    </header>
  );
};

export default Header;
