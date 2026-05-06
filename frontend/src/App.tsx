import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from '@/components/sidebar/Sidebar';
import BackgroundOrbs from '@/components/ui/BackgroundOrbs';
import AddTaskModal from '@/components/modals/AddTaskModal';
import DashboardPage from '@/pages/DashboardPage';
import PlaceholderPage from '@/pages/PlaceholderPage';
import { useAppStore } from '@/store/appStore';
import { ActivePage } from '@/types';

export default function App() {
  const { activePage } = useAppStore();

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardPage key="dashboard" />;
      case 'daily':
      case 'planners':
      case 'personal':
      case 'goals':
        return <PlaceholderPage key={activePage} page={activePage as Exclude<ActivePage, 'dashboard'>} />;
      default:
        return <DashboardPage key="dashboard" />;
    }
  };

  return (
    <div className="relative flex h-screen overflow-hidden bg-base">
      <BackgroundOrbs />

      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <main className="relative z-10 flex-1 overflow-hidden px-5 py-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="h-full"
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global modal */}
      <AddTaskModal />
    </div>
  );
}
