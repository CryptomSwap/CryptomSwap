"use client";
import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import { addCreatorDrop } from "@/lib/storage";
import { MockDrop } from "@/lib/mockData";

export default function Page() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [unlockLimit, setUnlockLimit] = useState(100);
  const [price, setPrice] = useState(25);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.type.startsWith('image/') || file.type.startsWith('video/'))) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!selectedFile || !title.trim()) {
      alert('Please select a file and enter a title');
      return;
    }

    setIsUploading(true);

    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Create new drop
    const newDrop: MockDrop = {
      id: `drop_${Date.now()}`,
      title: title.trim(),
      creator: 'Lisa Luxury', // Mock creator name
      creatorId: 'creator1',
      description: description.trim(),
      thumbnail: previewUrl,
      unlockLimit,
      unlockCount: 0,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
      price,
    };

    // Save to sessionStorage
    addCreatorDrop(newDrop);

    // Clean up preview URL
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setIsUploading(false);
    alert('Drop uploaded successfully!');
    router.push('/creator');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="p-4 max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
                     <h1 className="text-xl font-bold text-[#ffa31a] tracking-wide font-sacrifice">
             Upload Drop
           </h1>
        </motion.div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Media Upload Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="glass-premium rounded-2xl p-6 border-2 border-transparent bg-gradient-to-r from-[#2e1065] to-[#6b21a8] shadow-xl"
          >
                         <h2 className="text-sm font-bold text-[#ffa31a] tracking-wide mb-4 uppercase font-sacrifice">
               Media
             </h2>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`
                relative w-full border-2 border-transparent bg-gradient-to-r from-[#2e1065] to-[#6b21a8] rounded-2xl p-8 text-center cursor-pointer transition-all duration-300
                ${isDragOver 
                  ? 'scale-105 bg-[#ffa31a]/5' 
                  : selectedFile 
                    ? 'hover:scale-[1.02]' 
                    : 'hover:scale-[1.02]'
                }
              `}
            >
              {selectedFile ? (
                <div className="space-y-2">
                  <div className="text-2xl mb-2 text-orange-500">📁</div>
                                     <p className="text-premium font-bold">{selectedFile.name}</p>
                                     <p className="text-sm text-secondary font-bold">Click to change</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="text-3xl mb-3 text-orange-500">📷</div>
                                     <p className="text-[#ffa31a] font-bold font-sacrifice">Click or drag files to upload</p>
                                     <p className="text-sm text-gray-400 font-bold mt-1">Images & Videos · JPG, PNG, MP4, MOV · Max 100MB</p>
                </div>
              )}
            </div>
            
            {previewUrl && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="mt-4"
              >
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-32 object-cover rounded-xl border border-white/10"
                />
              </motion.div>
            )}
          </motion.div>

          {/* Drop Details Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="glass-premium rounded-2xl p-6 border-2 border-transparent bg-gradient-to-r from-[#2e1065] to-[#6b21a8] shadow-xl"
          >
                         <h2 className="text-sm font-bold text-[#ffa31a] tracking-wide mb-6 uppercase font-sacrifice">
               Drop Details
             </h2>
            
            <div className="space-y-6">
              <div>
                                  <label className="block text-sm font-bold text-[#ffa31a] mb-3 tracking-wide font-sacrifice">
                    Title
                  </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input-premium w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-premium placeholder:text-placeholder transition-all duration-300 focus:border-[#ffa31a]/50 focus:bg-white/10"
                  placeholder="e.g. Midnight Secrets"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-[#ffa31a] mb-3 tracking-wide font-sacrifice">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="input-premium w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-premium placeholder:text-placeholder h-24 resize-none transition-all duration-300 focus:border-[#ffa31a]/50 focus:bg-white/10"
                  placeholder="Describe your drop"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-[#ffa31a] mb-3 tracking-wide font-sacrifice">
                    Unlock Limit
                  </label>
                  <input
                    type="number"
                    value={unlockLimit}
                    onChange={(e) => setUnlockLimit(parseInt(e.target.value))}
                    className="input-premium w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-premium transition-all duration-300 focus:border-[#ffa31a]/50 focus:bg-white/10"
                    min="1"
                    max="1000"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-[#ffa31a] mb-3 tracking-wide font-sacrifice">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(parseInt(e.target.value))}
                    className="input-premium w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-premium transition-all duration-300 focus:border-[#ffa31a]/50 focus:bg-white/10"
                    min="0"
                    max="100"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Upload Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <button
              type="submit"
              disabled={isUploading || !selectedFile || !title.trim()}
              className={`
                relative w-full py-4 px-6 rounded-full font-medium text-white transition-all duration-300 overflow-hidden
                ${isUploading || !selectedFile || !title.trim()
                  ? 'bg-gradient-to-r from-orange-500/50 via-purple-500/50 to-pink-500/50 cursor-not-allowed'
                  : 'bg-gradient-to-r from-orange-500 via-purple-500 to-pink-500 hover:from-orange-400 hover:via-purple-400 hover:to-pink-400 hover:scale-[1.02] active:scale-[0.98]'
                }
              `}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isUploading ? (
                  <>
                    <div className="spinner w-4 h-4"></div>
                                         <span className="font-bold font-sacrifice">Uploading...</span>
                  </>
                ) : (
                  <>
                    <span className="text-lg">+</span>
                                         <span className="font-bold font-sacrifice">Upload Drop</span>
                  </>
                )}
              </span>
            </button>
          </motion.div>
        </form>
      </main>
    </div>
  );
} 