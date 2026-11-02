import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Save, RotateCcw, Sliders, Calendar, Music, User, FileText, Check } from 'lucide-react';
import {
  RelationshipConfig,
  saveRelationshipConfig,
  resetRelationshipConfig
} from '../config/relationshipData';
import { audioEngine } from '../utils/audioSynth';

interface UniverseSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: RelationshipConfig;
  onUpdateConfig: (newConfig: RelationshipConfig) => void;
}

export function UniverseSettingsModal({
  isOpen,
  onClose,
  config,
  onUpdateConfig
}: UniverseSettingsModalProps) {
  const [formData, setFormData] = useState<RelationshipConfig>({ ...config });
  const [customAudioInput, setCustomAudioInput] = useState<string>(audioEngine.getCustomAudioUrl() || '');
  const [savedToast, setSavedToast] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    saveRelationshipConfig(formData);
    audioEngine.setCustomAudioUrl(customAudioInput.trim() ? customAudioInput.trim() : null);
    onUpdateConfig(formData);
    setSavedToast(true);
    setTimeout(() => {
      setSavedToast(false);
      onClose();
    }, 900);
  };

  const handleReset = () => {
    if (confirm("Reset all personalized settings back to original defaults?")) {
      const reset = resetRelationshipConfig();
      setFormData({ ...reset });
      audioEngine.setCustomAudioUrl(null);
      setCustomAudioInput('');
      onUpdateConfig(reset);
      onClose();
    }
  };

  // Convert ISO string to date input format YYYY-MM-DD
  const dateValue = formData.anniversaryDate.split('T')[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.94 }}
        className="relative w-full max-w-2xl bg-[#151313] border border-[#8B101D]/70 rounded-2xl p-6 sm:p-8 my-8 glow-crimson max-h-[90vh] overflow-y-auto text-left"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#8B101D]/30 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <Sliders className="w-5 h-5 text-[#C51F35]" />
            <div>
              <h3 className="font-serif-editorial text-2xl text-[#F3EEEE]">
                Personalize Our Universe
              </h3>
              <p className="text-xs font-sans-clean text-[#AAA3A3]">
                Edit names, anniversary date, romantic notes, and soundtrack.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-[#080808] border border-[#8B101D]/40 text-[#AAA3A3] hover:text-[#F3EEEE] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="space-y-6">
          {/* Names Section */}
          <div>
            <label className="text-xs font-cinzel uppercase tracking-wider text-[#C51F35] block mb-2 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" /> Couple Names
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-[11px] text-[#AAA3A3] block mb-1">Your Name</span>
                <input
                  type="text"
                  value={formData.partnerOne}
                  onChange={(e) => setFormData({ ...formData, partnerOne: e.target.value })}
                  placeholder="e.g. Alex"
                  className="w-full px-3.5 py-2.5 bg-[#080808] border border-[#2A161B] focus:border-[#C51F35] rounded-lg text-sm text-[#F3EEEE] outline-none"
                />
              </div>

              <div>
                <span className="text-[11px] text-[#AAA3A3] block mb-1">Partner's Name</span>
                <input
                  type="text"
                  value={formData.partnerTwo}
                  onChange={(e) => setFormData({ ...formData, partnerTwo: e.target.value })}
                  placeholder="e.g. Taylor"
                  className="w-full px-3.5 py-2.5 bg-[#080808] border border-[#2A161B] focus:border-[#C51F35] rounded-lg text-sm text-[#F3EEEE] outline-none"
                />
              </div>
            </div>
          </div>

          {/* Anniversary Date */}
          <div>
            <label className="text-xs font-cinzel uppercase tracking-wider text-[#C51F35] block mb-2 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> Relationship Start Date
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <input
                  type="date"
                  value={dateValue}
                  onChange={(e) => {
                    if (e.target.value) {
                      setFormData({
                        ...formData,
                        anniversaryDate: `${e.target.value}T20:00:00`
                      });
                    }
                  }}
                  className="w-full px-3.5 py-2.5 bg-[#080808] border border-[#2A161B] focus:border-[#C51F35] rounded-lg text-sm text-[#F3EEEE] outline-none"
                />
              </div>
              <div>
                <input
                  type="text"
                  value={formData.anniversarySubtitle}
                  onChange={(e) =>
                    setFormData({ ...formData, anniversarySubtitle: e.target.value })
                  }
                  placeholder="Anniversary subtitle message"
                  className="w-full px-3.5 py-2.5 bg-[#080808] border border-[#2A161B] focus:border-[#C51F35] rounded-lg text-sm text-[#F3EEEE] outline-none"
                />
              </div>
            </div>
          </div>

          {/* Love Letter Customization */}
          <div>
            <label className="text-xs font-cinzel uppercase tracking-wider text-[#C51F35] block mb-2 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" /> Love Letter Headline & Salutation
            </label>
            <div className="space-y-3">
              <input
                type="text"
                value={formData.loveLetter.headline}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    loveLetter: { ...formData.loveLetter, headline: e.target.value }
                  })
                }
                placeholder="Headline"
                className="w-full px-3.5 py-2.5 bg-[#080808] border border-[#2A161B] focus:border-[#C51F35] rounded-lg text-sm text-[#F3EEEE] outline-none"
              />
              <input
                type="text"
                value={formData.loveLetter.salutation}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    loveLetter: { ...formData.loveLetter, salutation: e.target.value }
                  })
                }
                placeholder="Salutation"
                className="w-full px-3.5 py-2.5 bg-[#080808] border border-[#2A161B] focus:border-[#C51F35] rounded-lg text-sm text-[#F3EEEE] outline-none"
              />
            </div>
          </div>

          {/* Music Audio Info */}
          <div>
            <label className="text-xs font-cinzel uppercase tracking-wider text-[#C51F35] block mb-2 flex items-center gap-1.5">
              <Music className="w-3.5 h-3.5" /> Soundtrack
            </label>
            <div className="p-3.5 rounded-lg bg-[#080808] border border-[#2A161B] text-xs text-[#F3EEEE] flex items-center justify-between">
              <div>
                <span className="font-cinzel font-medium text-[#F3EEEE] block">Sure Thing</span>
                <span className="text-[11px] text-[#AAA3A3]">Miguel · Official Lyric Video</span>
              </div>
              <span className="text-[10px] uppercase font-cinzel text-[#C51F35] tracking-wider border border-[#8B101D]/40 px-2.5 py-1 rounded-full">
                Active
              </span>
            </div>
            <p className="text-[11px] text-[#AAA3A3] mt-1.5">
              Powered by the official YouTube IFrame Player with volume set to 100% and synchronized playback controls.
            </p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="mt-8 pt-5 border-t border-[#8B101D]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs font-cinzel text-[#AAA3A3] hover:text-white transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#8B101D]" /> Reset Defaults
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-[#080808] border border-[#8B101D]/30 text-xs font-cinzel uppercase text-[#AAA3A3] hover:text-[#F3EEEE] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2 rounded-lg bg-[#8B101D] hover:bg-[#C51F35] text-xs font-cinzel uppercase tracking-wider text-[#F3EEEE] transition-all cursor-pointer shadow-[0_0_15px_rgba(139,16,29,0.5)]"
            >
              {savedToast ? <Check className="w-4 h-4 text-emerald-400" /> : <Save className="w-4 h-4" />}
              {savedToast ? "Saved!" : "Save Universe"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
