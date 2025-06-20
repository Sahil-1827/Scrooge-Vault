import VaultClaimModule from './components/organisms/VaultClaimModule';

// Main App component serving as the entry point
const App: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-gray-900 to-purple-900">
      <VaultClaimModule />
    </div>
  );
};

export default App;