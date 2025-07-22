"use client";
import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
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

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
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
        <h1 className="font-bold text-2xl mb-6 text-text">Upload Drop</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Upload */}
          <div className="bg-surface rounded-xl p-4">
            <h2 className="font-bold text-lg mb-4 text-text">Media</h2>
        <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-accent-orange transition-colors"
            >
              {selectedFile ? (
      <div>
                  <p className="text-text font-bold">{selectedFile.name}</p>
                  <p className="text-sm text-gray-400">Click to change</p>
      </div>
              ) : (
      <div>
                  <p className="text-text font-bold">Select Media</p>
                  <p className="text-sm text-gray-400">Images or videos</p>
      </div>
              )}
            </button>
            
            {previewUrl && (
              <div className="mt-4">
              <img
                src={previewUrl}
                alt="Preview"
                  className="w-full h-32 object-cover rounded-lg"
              />
            </div>
            )}
          </div>

          {/* Drop Details */}
          <div className="bg-surface rounded-xl p-4">
            <h2 className="font-bold text-lg mb-4 text-text">Drop Details</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-text mb-2">Title</label>
          <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-background border border-gray-600 rounded-lg px-3 py-2 text-text"
                  placeholder="Enter drop title"
                  required
          />
        </div>
              
              <div>
                <label className="block text-sm font-bold text-text mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-background border border-gray-600 rounded-lg px-3 py-2 text-text h-20 resize-none"
                  placeholder="Describe your drop"
                />
      </div>

              <div className="grid grid-cols-2 gap-4">
        <div>
                  <label className="block text-sm font-bold text-text mb-2">Unlock Limit</label>
          <input
            type="number"
                    value={unlockLimit}
                    onChange={(e) => setUnlockLimit(parseInt(e.target.value))}
                    className="w-full bg-background border border-gray-600 rounded-lg px-3 py-2 text-text"
                    min="1"
                    max="1000"
          />
        </div>
                
        <div>
                  <label className="block text-sm font-bold text-text mb-2">Price ($)</label>
          <input
            type="number"
                    value={price}
                    onChange={(e) => setPrice(parseInt(e.target.value))}
                    className="w-full bg-background border border-gray-600 rounded-lg px-3 py-2 text-text"
                    min="0"
                    max="100"
          />
        </div>
      </div>
            </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
            disabled={isUploading || !selectedFile || !title.trim()}
            className="w-full bg-accent-orange text-black font-bold py-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
            {isUploading ? 'Uploading...' : 'Upload Drop'}
      </button>
    </form>
      </main>
    </div>
  );
} 