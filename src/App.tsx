import VaultClaimModule from './components/organisms/VaultClaimModule';

// Main App component serving as the entry point
const App: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-4 px-2 sm:px-4 bg-[#211A2C]"> {/* Adjusted padding and exact background color */}
      <VaultClaimModule />
    </div>
  );
};

export default App;