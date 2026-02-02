import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { heroSection } from '@/lib/content/hero';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Hero Editor State
  const [heroForm, setHeroForm] = useState({
    tagline: '',
    description: '',
    imageUrl: ''
  });

  const [bannerForm, setBannerForm] = useState({
    text: 'Alerte : Message important ici !',
    active: false
  });

  useEffect(() => {
    // Load initial data from LS or defaults
    const saved = localStorage.getItem('heroContent');
    if (saved) {
      setHeroForm(JSON.parse(saved));
    } else {
      setHeroForm({
        tagline: heroSection.tagline || '',
        description: heroSection.description || '',
        imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop"
      });
    }

    const savedBanner = localStorage.getItem('announcementBanner');
    if (savedBanner) {
      setBannerForm(JSON.parse(savedBanner));
    }
  }, []);

  const handleHeroSave = () => {
    localStorage.setItem('heroContent', JSON.stringify(heroForm));
    alert('Contenu de la section Accueil mis à jour !');
  };

  const handleBannerSave = () => {
    localStorage.setItem('announcementBanner', JSON.stringify(bannerForm));
    alert('Paramètres de l\'alerte mis à jour !');
  };

  const menuItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: 'lucide:layout-dashboard' },
    { id: 'home', label: 'Accueil', icon: 'lucide:home' },
    { id: 'about', label: 'A propos', icon: 'lucide:info' },
    { id: 'projects', label: 'Projets', icon: 'lucide:folder-kanban' },
    { id: 'contact', label: 'Nous rejoindre', icon: 'lucide:mail' },
    { id: 'settings', label: 'Paramètres', icon: 'lucide:settings' },
  ];

  // Fake Data for Chart
  const data = [
    { month: 'Jan', visits: 4000 },
    { month: 'Fév', visits: 3000 },
    { month: 'Mar', visits: 2000 },
    { month: 'Avr', visits: 2780 },
    { month: 'Mai', visits: 1890 },
    { month: 'Juin', visits: 2390 },
    { month: 'Juil', visits: 3490 },
    { month: 'Août', visits: 4000 },
    { month: 'Sep', visits: 3000 },
    { month: 'Oct', visits: 4500 },
    { month: 'Nov', visits: 3200 },
    { month: 'Déc', visits: 3800 },
  ];

  const maxVisits = Math.max(...data.map(d => d.visits));

  const Chart = () => (
    <div className="w-full h-64 mt-4 flex items-end justify-between gap-2">
      {data.map((item, index) => {
        const heightPercentage = (item.visits / maxVisits) * 100;
        return (
          <div key={index} className="flex flex-col items-center flex-1 group">
            {/* Tooltip */}
            <div className="opacity-0 group-hover:opacity-100 mb-2 p-1 bg-dark text-white text-xs rounded transition-opacity">
              {item.visits}
            </div>
            {/* Bar */}
            <div
              className="w-full max-w-[30px] bg-accent/80 hover:bg-accent rounded-t-sm transition-all duration-300"
              style={{ height: `${heightPercentage}%` }}
            ></div>
            {/* Label */}
            <div className="text-xs text-slate-500 mt-2 rotate-45 md:rotate-0 origin-left">{item.month}</div>
          </div>
        )
      })}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <h3 className="text-slate-500 text-sm font-medium mb-2">Visites Totales</h3>
                <p className="text-3xl font-bold text-dark">52,345</p>
                <span className="text-green-500 text-sm font-medium">+18% depuis le mois dernier</span>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <h3 className="text-slate-500 text-sm font-medium mb-2">Tchat Box</h3>
                <p className="text-3xl font-bold text-dark">12</p>
                <span className="text-green-500 text-sm font-medium">Nouveaux messages</span>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <h3 className="text-slate-500 text-sm font-medium mb-2">Abonnés Newsletter</h3>
                <p className="text-3xl font-bold text-dark">1,203</p>
              </div>
            </div>

            {/* Chart Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-dark">Aperçu des Visites (Annuel)</h3>
                <select className="border-none bg-slate-50 text-sm text-slate-500 p-2 rounded-lg outline-none">
                  <option>2026</option>
                  <option>2025</option>
                </select>
              </div>
              <Chart />
            </div>
          </div>
        );
      case 'home':
        return (
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold mb-6">Éditer la section Accueil</h2>
            <div className="space-y-6 max-w-2xl">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Titre / Tagline</label>
                <input
                  type="text"
                  value={heroForm.tagline}
                  onChange={(e) => setHeroForm({ ...heroForm, tagline: e.target.value })}
                  className="w-full p-3 border border-slate-200 rounded-lg outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                <textarea
                  rows={4}
                  value={heroForm.description}
                  onChange={(e) => setHeroForm({ ...heroForm, description: e.target.value })}
                  className="w-full p-3 border border-slate-200 rounded-lg outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Image de fond (URL)</label>
                <input
                  type="text"
                  value={heroForm.imageUrl}
                  onChange={(e) => setHeroForm({ ...heroForm, imageUrl: e.target.value })}
                  className="w-full p-3 border border-slate-200 rounded-lg outline-none focus:border-accent"
                />
                {heroForm.imageUrl && (
                  <div className="mt-2 w-full h-40 rounded-lg bg-cover bg-center" style={{ backgroundImage: `url('${heroForm.imageUrl}')` }}></div>
                )}
              </div>
              <button
                onClick={handleHeroSave}
                className="px-6 py-3 bg-accent text-white font-bold rounded-lg hover:bg-dark transition-colors"
              >
                Enregistrer les modifications
              </button>
            </div>
          </div>
        );
      case 'about':
        return <div className="bg-white p-8 rounded-xl"><h2 className="text-2xl font-bold mb-4">Éditer la section A Propos</h2></div>;
      case 'projects':
        return <div className="bg-white p-8 rounded-xl"><h2 className="text-2xl font-bold mb-4">Gérer les Projets</h2></div>;
      case 'contact':
        return <div className="bg-white p-8 rounded-xl"><h2 className="text-2xl font-bold mb-4">Messages & Contact</h2></div>;
      case 'settings':
        return (
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold mb-6">Paramètres Généraux</h2>
            <div className="space-y-6 max-w-lg">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Nom du site</label>
                <input type="text" className="w-full p-3 border border-slate-200 rounded-lg outline-none focus:border-accent" defaultValue="Vatsal Portfolio" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email de notification</label>
                <input type="email" className="w-full p-3 border border-slate-200 rounded-lg outline-none focus:border-accent" defaultValue="admin@vatsal.com" />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="alertToggle"
                  className="w-4 h-4 text-red-600 focus:ring-red-500 rounded border-slate-300"
                  checked={bannerForm.active}
                  onChange={(e) => setBannerForm({ ...bannerForm, active: e.target.checked })}
                />
                <label htmlFor="alertToggle" className="text-sm font-medium text-slate-700">Activer l'alerte rouge sur l'accueil</label>
              </div>

              {bannerForm.active && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Message de l'alerte</label>
                  <input
                    type="text"
                    value={bannerForm.text}
                    onChange={(e) => setBannerForm({ ...bannerForm, text: e.target.value })}
                    className="w-full p-3 border border-red-200 bg-red-50 text-red-900 rounded-lg outline-none focus:border-red-500"
                    placeholder="Entrez le message d'alerte..."
                  />
                </div>
              )}

              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={handleBannerSave}
                  className="px-6 py-2 bg-slate-800 text-white rounded-lg hover:bg-dark transition-colors mr-3"
                >
                  Enregistrer les paramètres
                </button>
              </div>

              <div className="mt-12 pt-8 border-t border-slate-100">
                <h3 className="text-lg font-bold mb-4 text-slate-400 uppercase tracking-wider text-xs">Autres paramètres</h3>
                <div className="flex items-center gap-2 mb-4 opacity-50 pointer-events-none">
                  <input type="checkbox" id="maintenance" className="w-4 h-4 text-accent" />
                  <label htmlFor="maintenance" className="text-sm text-slate-600">Site en maintenance</label>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <div>Sélectionnez une section</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 fixed h-full z-10 hidden md:block">
        <div className="p-6">
          <Link to="/" className="text-2xl font-bold text-[#0f291e] tracking-tight">
            Admin<span className="text-accent">Panel</span>
          </Link>
        </div>

        <nav className="mt-6 px-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === item.id
                ? 'bg-accent/10 text-accent'
                : 'text-slate-600 hover:bg-slate-50 hover:text-dark'
                }`}
            >
              <span className="flex items-center justify-center">
                <Icon icon={item.icon} width="20" height="20" />
              </span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-slate-100">
          <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-red-500 transition-colors text-sm font-medium px-4 py-2">
            <span className="flex items-center justify-center">
              <Icon icon="lucide:log-out" width="18" height="18" />
            </span>
            Déconnexion
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-dark capitalize">{menuItems.find(m => m.id === activeTab)?.label}</h1>
            <p className="text-slate-500 text-sm">Bienvenue sur votre espace d'administration</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold">VS</div>
          </div>
        </header>

        {renderContent()}
      </main>
    </div>
  );
};

export default AdminPage;
