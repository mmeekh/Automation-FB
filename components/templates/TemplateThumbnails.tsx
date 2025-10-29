import Image from 'next/image';

/**
 * Get thumbnail preview for a template
 */
export function getTemplateThumbnail(templateId: string) {
  const thumbnailConfigs: Record<string, JSX.Element> = {
    'instagram-bald-to-haired': (
      <div className="bg-gradient-to-br from-amber-50 to-white p-4">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white text-xs font-bold">
            HT
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-800">Hair Transplant Center</p>
            <p className="text-[10px] text-gray-400">Active now</p>
          </div>
        </div>
        <div className="space-y-2.5">
          <div className="flex justify-start">
            <div className="max-w-[80%]">
              <div className="rounded-2xl rounded-tl-sm bg-gray-100 px-3 py-2">
                <p className="text-[11px] text-gray-800">Please send your selfie photo 📸</p>
              </div>
              <p className="text-[9px] text-gray-400 mt-1">4:18 PM</p>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="max-w-[65%]">
              <div className="rounded-2xl rounded-tr-sm bg-blue-500 p-2">
                <Image
                  src="/media/hairchange1.webp"
                  alt="Customer Selfie"
                  width={112}
                  height={112}
                  className="w-28 h-28 object-cover rounded-lg"
                />
              </div>
              <p className="text-[9px] text-gray-400 text-right mt-1">4:19 PM</p>
            </div>
          </div>
          <div className="flex justify-start">
            <div className="max-w-[80%]">
              <div className="rounded-2xl rounded-tl-sm bg-gray-100 px-3 py-2">
                <p className="text-[11px] text-gray-800">Great! Now please send the hair style you want 💇‍♂️</p>
              </div>
              <p className="text-[9px] text-gray-400 mt-1">4:19 PM</p>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="max-w-[65%]">
              <div className="rounded-2xl rounded-tr-sm bg-blue-500 p-2">
                <Image
                  src="/media/hairchange2.webp"
                  alt="Desired Hair Style"
                  width={112}
                  height={112}
                  className="w-28 h-28 object-cover rounded-lg"
                />
              </div>
              <p className="text-[9px] text-gray-400 text-right mt-1">4:20 PM</p>
            </div>
          </div>
          <div className="flex justify-start">
            <div className="max-w-[75%]">
              <div className="rounded-2xl rounded-tl-sm bg-gray-100 px-3 py-2">
                <p className="text-[11px] text-gray-800">Your hair is being prepared... ✨</p>
              </div>
              <p className="text-[9px] text-gray-400 mt-1">4:20 PM</p>
            </div>
          </div>
          <div className="flex justify-start">
            <div className="max-w-[85%]">
              <div className="rounded-2xl rounded-tl-sm bg-gray-100 p-3">
                <p className="text-[11px] text-gray-800 font-medium mb-2">🌟 Your Transformation is Ready!</p>
                <div className="rounded-lg overflow-hidden mb-2">
                  <Image
                    src="/media/hairchange3.webp"
                    alt="Hair Transformation Result"
                    width={200}
                    height={200}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[11px] font-semibold py-2 px-4 rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all">
                  📅 Randevu Al
                </button>
              </div>
              <p className="text-[9px] text-gray-400 mt-1">4:21 PM</p>
            </div>
          </div>
          <div className="flex justify-start">
            <div className="max-w-[70%]">
              <div className="rounded-2xl rounded-tl-sm bg-gray-100 px-3 py-2">
                <p className="text-[11px] text-gray-800">Looks much better, doesn&apos;t it? 😊</p>
              </div>
              <p className="text-[9px] text-gray-400 mt-1">4:21 PM</p>
            </div>
          </div>
        </div>
      </div>
    ),
    'instagram-aesthetic-bald': (
      <div className="bg-gradient-to-br from-teal-50 to-white p-4">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
            AC
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-800">Aesthetic Clinic</p>
            <p className="text-[10px] text-gray-400">Active now</p>
          </div>
        </div>
        <div className="space-y-2.5">
          <div className="flex justify-start">
            <div className="max-w-[80%]">
              <div className="rounded-2xl rounded-tl-sm bg-gray-100 px-3 py-2">
                <p className="text-[11px] text-gray-800">Please send your selfie photo 📸</p>
              </div>
              <p className="text-[9px] text-gray-400 mt-1">3:18 PM</p>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="max-w-[65%]">
              <div className="rounded-2xl rounded-tr-sm bg-blue-500 p-2">
                <div className="w-28 h-28 bg-gradient-to-br from-neutral-200 to-neutral-300 rounded-lg flex items-center justify-center text-[9px] text-gray-600">
                  👤 My Selfie
                </div>
              </div>
              <p className="text-[9px] text-gray-400 text-right mt-1">3:19 PM</p>
            </div>
          </div>
          <div className="flex justify-start">
            <div className="max-w-[80%]">
              <div className="rounded-2xl rounded-tl-sm bg-gray-100 px-3 py-2">
                <p className="text-[11px] text-gray-800">Great! Now please send the hair style you want 💇‍♂️</p>
              </div>
              <p className="text-[9px] text-gray-400 mt-1">3:19 PM</p>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="max-w-[65%]">
              <div className="rounded-2xl rounded-tr-sm bg-blue-500 p-2">
                <div className="w-28 h-28 bg-gradient-to-br from-teal-200 to-cyan-200 rounded-lg flex items-center justify-center text-[9px] text-teal-800">
                  💈 Desired Hair
                </div>
              </div>
              <p className="text-[9px] text-gray-400 text-right mt-1">3:20 PM</p>
            </div>
          </div>
          <div className="flex justify-start">
            <div className="max-w-[75%]">
              <div className="rounded-2xl rounded-tl-sm bg-gray-100 px-3 py-2">
                <p className="text-[11px] text-gray-800">Your hair is being prepared... ✨</p>
              </div>
              <p className="text-[9px] text-gray-400 mt-1">3:20 PM</p>
            </div>
          </div>
          <div className="flex justify-start">
            <div className="max-w-[85%]">
              <div className="rounded-2xl rounded-tl-sm bg-gray-100 p-3">
                <p className="text-[11px] text-gray-800 font-medium mb-2">🌟 Your Transformation is Ready!</p>
                <div className="rounded-lg overflow-hidden mb-2">
                  <div className="h-32 bg-gradient-to-br from-teal-300 via-cyan-300 to-teal-400 flex items-center justify-center text-[10px] text-teal-900 font-semibold border-2 border-teal-500">
                    ✨ New Hair Result ✨
                  </div>
                </div>
                <button className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-[11px] font-semibold py-2 px-4 rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all">
                  📅 Randevu Al
                </button>
              </div>
              <p className="text-[9px] text-gray-400 mt-1">3:21 PM</p>
            </div>
          </div>
          <div className="flex justify-start">
            <div className="max-w-[70%]">
              <div className="rounded-2xl rounded-tl-sm bg-gray-100 px-3 py-2">
                <p className="text-[11px] text-gray-800">Looks much better, doesn&apos;t it? 😊</p>
              </div>
              <p className="text-[9px] text-gray-400 mt-1">3:21 PM</p>
            </div>
          </div>
        </div>
      </div>
    ),
  };

  return thumbnailConfigs[templateId] || null;
}

