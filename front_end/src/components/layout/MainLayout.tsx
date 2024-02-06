import { ReactNode } from 'react';
import { ModeToggle } from '@/components/themes/ModeToggle';
import LocalesToggle from '../common/locales_toggle/LocalesToggle';
type MainLayoutProps = {
    children: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <div>
            <div className='fixed right-10'><LocalesToggle /> </div>
            {children}
            <div className='fixed bottom-10 right-10'><ModeToggle /></div>
        </div>
    );
};

export default MainLayout;
