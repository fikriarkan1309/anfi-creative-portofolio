import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Save, Database, Info, Copy, Check } from 'lucide-react';

interface SanityConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfigSave: (projectId: string, dataset: string) => void;
}

export default function SanityConfigModal({ isOpen, onClose, onConfigSave }: SanityConfigModalProps) {
  const [projectId, setProjectId] = useState(() => localStorage.getItem('SANITY_PROJECT_ID') || '');
  const [dataset, setDataset] = useState(() => localStorage.getItem('SANITY_DATASET') || 'production');
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'failed'>('idle');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!projectId) {
      // Revert to fallbacks
      localStorage.removeItem('SANITY_PROJECT_ID');
      localStorage.removeItem('SANITY_DATASET');
      onConfigSave('', 'production');
      setConnectionStatus('idle');
      onClose();
      return;
    }

    // Attempt verification fetch on active config
    try {
      const url = `https://${projectId}.api.sanity.io/v2022-03-07/data/query/${dataset}?query=${encodeURIComponent('*[_type == "personalInfo"][0]')}`;
      const res = await fetch(url);
      if (res.ok) {
        setConnectionStatus('success');
        localStorage.setItem('SANITY_PROJECT_ID', projectId);
        localStorage.setItem('SANITY_DATASET', dataset);
        onConfigSave(projectId, dataset);
        setTimeout(() => {
          setConnectionStatus('idle');
          onClose();
        }, 1500);
      } else {
        setConnectionStatus('failed');
      }
    } catch {
      setConnectionStatus('failed');
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const schemas = [
    {
      name: 'personalInfo.ts',
      code: `export default {
  name: 'personalInfo',
  title: 'Personal Info',
  type: 'document',
  fields: [
    { name: 'name', type: 'string', title: 'Name' },
    { name: 'titles', type: 'array', of: [{type: 'string'}], title: 'Titles' },
    { name: 'bio', type: 'text', title: 'Short Bio' },
    { name: 'experienceYears', type: 'number', title: 'Years' },
    { name: 'projectsCount', type: 'number', title: 'Projects' },
    { name: 'clientsCount', type: 'number', title: 'Clients' },
    { name: 'aboutText', type: 'text', title: 'About Text' },
    { name: 'aboutPhotoUrl', type: 'url', title: 'About Section Photo URL (e.g., https://...)' },
    { name: 'cvUrl', type: 'url', title: 'Google Drive CV Link' },
    { name: 'portfolioPdfUrl', type: 'url', title: 'Google Drive Portfolio PDF Link' },
    { name: 'logoText', type: 'string', title: 'Logo Text (e.g., ANFI CREATIVE)' },
    { name: 'logoSubtext', type: 'string', title: 'Logo Subtext (e.g., DESIGN • APPAREL • WEB)' },
    { name: 'hideCmsSettings', type: 'boolean', title: 'Hide CMS Settings Button from Public?' },
    { name: 'whatsapp', type: 'string', title: 'WhatsApp' },
    { name: 'email', type: 'string', title: 'Email' },
    { name: 'instagram', type: 'string', title: 'Instagram' },
    { name: 'linkedinUrl', type: 'url', title: 'LinkedIn URL' },
    { name: 'behanceUrl', type: 'url', title: 'Behance URL' },
    { name: 'tiktokUrl', type: 'url', title: 'TikTok URL' },
    { name: 'location', type: 'string', title: 'Location' }
  ]
}`
    },
    {
      name: 'skill.ts',
      code: `export default {
  name: 'skill',
  title: 'Tools / Skill',
  type: 'document',
  fields: [
    { name: 'name', type: 'string', title: 'Tool / Skill Name (e.g., Figma)' },
    { name: 'category', type: 'string', title: 'Category (Design or Development)' },
    { name: 'level', type: 'number', title: 'Proficiency Level (0-100)' },
    { name: 'abbr', type: 'string', title: '2-Letter Abbreviation (e.g., Fg, Ai)' },
    { name: 'color', type: 'string', title: 'Brand/Hex Color Code (e.g., #F24E1E)' },
    { name: 'imageUrl', type: 'url', title: 'Direct Icon/Image Override URL (optional)' }
  ]
}`
    },
    {
      name: 'testimonial.ts',
      code: `export default {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    { name: 'author', type: 'string', title: 'Author Name' },
    { name: 'role', type: 'string', title: 'Role / Designation' },
    { name: 'quote', type: 'text', title: 'Client Feedback' },
    { name: 'rating', type: 'number', title: 'Rating (1-5)' },
    { name: 'avatarUrl', type: 'url', title: 'Client Avatar URL (or leave empty for initials)' }
  ]
}`
    },
    {
      name: 'project.ts',
      code: `export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', title: 'Title' },
    { name: 'category', type: 'string', title: 'Category', options: { list: ['Branding', 'Jersey', 'Website'] } },
    { name: 'imageUrl', type: 'url', title: 'Direct Image URL or Asset' },
    { name: 'tag', type: 'string', title: 'Project Tag Subtitle' },
    { name: 'client', type: 'string', title: 'Client Name (optional)' },
    { name: 'duration', type: 'string', title: 'Project Duration (e.g., 2-3 Weeks) (optional)' },
    { name: 'deliverables', type: 'string', title: 'Project Deliverables list (optional)' },
    { name: 'challenge', type: 'text', title: 'Key Challenge (optional)' },
    { name: 'solution', type: 'text', title: 'Creative Solution (optional)' },
    { name: 'quote', type: 'text', title: 'Feedback / Quote from client (optional)' }
  ]
}`
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative w-full max-w-2xl bg-[#0F141C] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[85vh]"
          >
            {/* Header */}
            <div className="p-5 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-brand-cyan">
                <Database className="w-5 h-5" />
                <span className="font-display font-bold text-sm tracking-wider uppercase text-white">
                  Sanity CMS Direct Integration
                </span>
              </div>
              <button
                onClick={onClose}
                className="text-[#A0AEC0] hover:text-white transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 overflow-y-auto flex flex-col gap-8">
              
              {/* Instructions and Note */}
              <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg flex items-start gap-3">
                <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div className="text-xs text-[#A0AEC0] leading-relaxed">
                  <strong className="text-white">Live Sanity Connection:</strong> Anda dapat mengintegrasikan data portfolio ini dengan Sanity CMS milik Anda secara langsung. Cukup masukkan Project ID &amp; Dataset Anda di bawah, maka sistem akan langsung berganti memuat data dari Sanity Anda jika schema sesuai. Bila dikosongkan, ia akan menggunakan data fallback prestise dari Fikri Arkan.
                </div>
              </div>

              {/* Form Input fields */}
              <form onSubmit={handleSave} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-widest font-mono text-[#718096] font-bold">
                      Sanity Project ID
                    </label>
                    <input
                      type="text"
                      value={projectId}
                      onChange={(e) => setProjectId(e.target.value)}
                      placeholder="e.g. jx7v8p1s (or leave empty to reset)"
                      className="bg-[#080C11] border border-white/10 p-3 text-xs font-mono text-white rounded focus:ring-1 focus:ring-brand-cyan focus:outline-none focus:border-brand-cyan"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-widest font-mono text-[#718096] font-bold">
                      Sanity Dataset
                    </label>
                    <input
                      type="text"
                      value={dataset}
                      onChange={(e) => setDataset(e.target.value)}
                      placeholder="e.g. production"
                      className="bg-[#080C11] border border-white/10 p-3 text-xs font-mono text-white rounded focus:ring-1 focus:ring-brand-cyan focus:outline-none focus:border-brand-cyan"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center mt-2">
                  <div className="text-[11px] font-mono flex flex-col gap-1">
                    {connectionStatus === 'success' && (
                      <span className="text-green-400">✓ Connected successfully! Page refreshing...</span>
                    )}
                    {connectionStatus === 'failed' && (
                      <>
                        <span className="text-red-400 font-bold">✗ Connection failed. Check inputs &amp; CORS rules.</span>
                        <button
                          type="button"
                          onClick={() => {
                            localStorage.setItem('SANITY_PROJECT_ID', projectId);
                            localStorage.setItem('SANITY_DATASET', dataset);
                            onConfigSave(projectId, dataset);
                            setConnectionStatus('success');
                            setTimeout(() => {
                              setConnectionStatus('idle');
                              onClose();
                            }, 1000);
                          }}
                          className="text-brand-cyan hover:underline hover:text-white text-left text-[10px] uppercase font-bold tracking-wider mt-1 cursor-pointer"
                        >
                          → Tetap Simpan (Save Anyway)
                        </button>
                      </>
                    )}
                  </div>
                  
                  <button
                    type="submit"
                    className="flex items-center gap-2 bg-brand-cyan hover:bg-brand-cyan/85 text-[#080C10] font-display text-xs font-bold tracking-wider rounded-xs py-2.5 px-6 transition-all duration-300"
                  >
                    <Save className="w-4 h-4" />
                    SAVE CONFIG
                  </button>
                </div>
              </form>

              {/* Schema blueprints */}
              <div className="border-t border-white/5 pt-6">
                <span className="text-[11px] font-display font-bold uppercase tracking-wider text-white block mb-4">
                  Recommended Sanity Schemas Blueprint
                </span>
                
                <div className="flex flex-col gap-5">
                  {schemas.map((schema, index) => (
                    <div key={index} className="flex flex-col gap-2 rounded bg-black/60 border border-white/5 p-4 relative">
                      <div className="flex justify-between items-center bg-[#0C1017] -mx-4 -mt-4 px-4 py-2 border-b border-white/5 rounded-t">
                        <span className="text-[10px] font-mono font-bold text-brand-cyan">
                          {schema.name}
                        </span>
                        
                        <button
                          onClick={() => copyToClipboard(schema.code, index)}
                          className="text-[#A0AEC0] hover:text-white transition-colors flex items-center gap-1 text-[10px] font-mono"
                        >
                          {copiedIndex === index ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-green-400" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              Copy Code
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="text-[9.5px] text-[#A0E2F0]/80 font-mono overflow-x-auto whitespace-pre leading-relaxed pt-2 scrollbar-none">
                        {schema.code}
                      </pre>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
