import React, { useState } from 'react';
import { X, Sparkles, Check, Upload, Calendar, Clock, DollarSign, Heart, Info } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CustomOrderModal: React.FC = () => {
  const { isCustomOrderOpen, closeCustomOrder, submitCustomOrder } = useShop();

  const [itemType, setItemType] = useState('Heirloom Throw Blanket');
  const [fiberChoice, setFiberChoice] = useState('Highland Wool');
  const [selectedColors, setSelectedColors] = useState<string[]>(['Oatmeal Cream', 'Warm Terracotta']);
  const [sizeOption, setSizeOption] = useState('Standard Throw (50" x 60")');
  const [customDimensions, setCustomDimensions] = useState('');
  const [personalizationText, setPersonalizationText] = useState('');
  const [neededByDate, setNeededByDate] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [referencePhotoPreview, setReferencePhotoPreview] = useState<string | null>(null);
  
  const [submittedOrderId, setSubmittedOrderId] = useState<string | null>(null);

  if (!isCustomOrderOpen) return null;

  const colorPaletteOptions = [
    { name: 'Oatmeal Cream', hex: '#EDE6DA' },
    { name: 'Warm Terracotta', hex: '#C86D51' },
    { name: 'Soft Sage Pine', hex: '#879783' },
    { name: 'Mustard Honeycomb', hex: '#CF9943' },
    { name: 'Dusty Mauve Rose', hex: '#C29891' },
    { name: 'Deep Forest Spruce', hex: '#3E5641' },
    { name: 'Warm Charcoal Stone', hex: '#524B47' },
    { name: 'Raw Natural Flax', hex: '#DACABA' }
  ];

  const toggleColor = (name: string) => {
    setSelectedColors((prev) =>
      prev.includes(name)
        ? prev.length > 1
          ? prev.filter((c) => c !== name)
          : prev
        : prev.length < 4
        ? [...prev, name]
        : prev
    );
  };

  // Real-time live estimate calculation based on complexity
  const getEstimate = () => {
    let basePrice = 75;
    let baseHours = 8;

    if (itemType.includes('Blanket')) {
      basePrice = 145;
      baseHours = 18;
      if (sizeOption.includes('Queen')) {
        basePrice += 70;
        baseHours += 10;
      }
    } else if (itemType.includes('Amigurumi')) {
      basePrice = 58;
      baseHours = 7;
    } else if (itemType.includes('Wearable') || itemType.includes('Cardigan')) {
      basePrice = 160;
      baseHours = 24;
    } else if (itemType.includes('Tote')) {
      basePrice = 68;
      baseHours = 10;
    }

    if (fiberChoice === 'Highland Wool') basePrice += 15;
    if (fiberChoice === 'Bamboo Silk Blend') basePrice += 20;
    if (personalizationText.trim()) basePrice += 10; // engraved wood tag

    return { price: basePrice, hours: baseHours };
  };

  const { price: estPrice, hours: estHours } = getEstimate();

  const handleSimulatedUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setReferencePhotoPreview(uploadEvent.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerEmail.trim()) {
      return;
    }

    const orderId = submitCustomOrder({
      itemType,
      yarnPreference: fiberChoice,
      selectedPalette: selectedColors,
      dimensions: sizeOption === 'Custom' ? customDimensions : sizeOption,
      personalizationText,
      neededByDate: neededByDate || 'No strict deadline',
      specialInstructions,
      estimatedPrice: estPrice,
      estimatedHours: estHours,
      customerName,
      customerEmail
    });

    setSubmittedOrderId(orderId);
  };

  const handleClose = () => {
    setSubmittedOrderId(null);
    closeCustomOrder();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-[#FAF7F2] rounded-3xl border border-[#EADBCC] w-full max-w-3xl shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EADBCC] bg-[#F7F2EB]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#B25329]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#8C5E43]">
              Bespoke Artisan Commission Studio
            </span>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 text-[#6B5F57] hover:text-[#2D2825] rounded-full hover:bg-[#ECE3D5] transition-colors"
            aria-label="Close custom order form"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto p-6 sm:p-8 flex-1">
          {submittedOrderId ? (
            <div className="py-12 px-4 text-center max-w-md mx-auto space-y-5">
              <div className="w-16 h-16 bg-[#E8F0E5] text-[#3B6B38] rounded-full flex items-center justify-center mx-auto border border-[#C5D8BF]">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#2D2825]">
                Custom Commission Requested!
              </h3>
              <p className="text-xs sm:text-sm text-[#5C534D] leading-relaxed">
                Thank you, <span className="font-semibold">{customerName}</span>. Your personalized request has been logged as <span className="font-mono font-bold text-[#B25329]">{submittedOrderId}</span>.
              </p>
              <div className="p-4 bg-[#F3ECE2] rounded-xl border border-[#E3D6C5] text-left text-xs text-[#524942] space-y-1.5 font-mono">
                <div>Item: {itemType}</div>
                <div>Palette: {selectedColors.join(', ')}</div>
                <div>Fiber: {fiberChoice}</div>
                <div>Estimate: ~${estPrice} ({estHours} artisan hours)</div>
              </div>
              <p className="text-xs text-[#7B7068]">
                Master Artisan Elena will review your colorway and email your personalized pattern swatch and turnaround schedule within 24 hours.
              </p>
              <button
                onClick={handleClose}
                className="w-full py-3 text-xs font-semibold text-white bg-[#2D2825] hover:bg-[#403833] rounded-xl transition-colors"
              >
                Return to Storefront
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="border-b border-[#EADBCC] pb-4">
                <h2 className="text-2xl font-serif font-bold text-[#231E1B]">
                  Design Your Dream Handmade Piece
                </h2>
                <p className="text-xs text-[#6B5F57] mt-1 leading-relaxed">
                  Have a specific nursery color scheme, wedding date, or heirloom pattern in mind? Tell our artisans your vision. We hand-crochet every stitch with non-toxic, heirloom-grade materials.
                </p>
              </div>

              {/* Step 1: Item Category */}
              <div>
                <label className="block text-xs font-bold text-[#403833] uppercase tracking-wider mb-2">
                  1. What would you like us to create?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    'Heirloom Throw Blanket',
                    'Amigurumi Character / Pet',
                    'Botanical Market Tote',
                    'Baby Blanket & Booties',
                    'Chunky Cable Cardigan',
                    'Custom Nursery Mobile'
                  ].map((type) => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setItemType(type)}
                      className={`p-3 rounded-xl border text-left text-xs transition-all ${
                        itemType === type
                          ? 'border-[#2D2825] bg-[#EAE0D3] font-semibold text-[#2D2825] shadow-2xs'
                          : 'border-[#DFCBB9] bg-[#F7F2EB] text-[#5C534D] hover:border-[#B25329]'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Yarn Fiber Preference */}
              <div>
                <label className="block text-xs font-bold text-[#403833] uppercase tracking-wider mb-2">
                  2. Choose your natural fiber
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    { name: 'Highland Wool', desc: 'Warm, cozy & springy heirloom' },
                    { name: 'Organic Combed Cotton', desc: 'Breathable, hypoallergenic, vegan' },
                    { name: 'Bamboo Silk Blend', desc: 'Ultra-silky soft for sensitive skin' }
                  ].map((fiber) => (
                    <button
                      type="button"
                      key={fiber.name}
                      onClick={() => setFiberChoice(fiber.name)}
                      className={`p-3 rounded-xl border text-left text-xs transition-all ${
                        fiberChoice === fiber.name
                          ? 'border-[#2D2825] bg-[#EAE0D3] font-semibold text-[#2D2825]'
                          : 'border-[#DFCBB9] bg-[#F7F2EB] text-[#5C534D] hover:border-[#B25329]'
                      }`}
                    >
                      <div className="font-semibold">{fiber.name}</div>
                      <div className="text-[11px] text-[#7B7068] mt-0.5">{fiber.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Colorway Palette Selection (Up to 4) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-[#403833] uppercase tracking-wider">
                    3. Select Color Palette (1 to 4 shades)
                  </label>
                  <span className="text-[11px] text-[#7B7068] font-mono">
                    {selectedColors.length}/4 chosen
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {colorPaletteOptions.map((c) => {
                    const isSelected = selectedColors.includes(c.name);
                    return (
                      <button
                        type="button"
                        key={c.name}
                        onClick={() => toggleColor(c.name)}
                        className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs transition-all ${
                          isSelected
                            ? 'border-[#2D2825] bg-[#E6DBCF] font-semibold text-[#2D2825]'
                            : 'border-[#DFCBB9] bg-[#F7F2EB] text-[#5C534D] hover:bg-white'
                        }`}
                      >
                        <span
                          className="w-4 h-4 rounded-full border border-black/10 shrink-0"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span className="truncate">{c.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 4: Sizing & Dimensions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#403833] uppercase tracking-wider mb-2">
                    4. Sizing & Scale
                  </label>
                  <select
                    value={sizeOption}
                    onChange={(e) => setSizeOption(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#F7F2EB] border border-[#DACABE] rounded-xl focus:outline-none focus:border-[#B25329]"
                  >
                    <option value='Standard Throw (50" x 60")'>Standard Throw (50" x 60")</option>
                    <option value='Oversized Sofa/Queen (60" x 75")'>Oversized Sofa/Queen (60" x 75")</option>
                    <option value='Crib / Nursery (35" x 42")'>Crib / Nursery (35" x 42")</option>
                    <option value='Standard Amigurumi (8" to 10")'>Standard Amigurumi (8" to 10")</option>
                    <option value='Custom'>Other Custom Dimensions...</option>
                  </select>
                </div>

                {sizeOption === 'Custom' && (
                  <div>
                    <label className="block text-xs font-bold text-[#403833] uppercase tracking-wider mb-2">
                      Specific Dimensions
                    </label>
                    <input
                      type="text"
                      value={customDimensions}
                      onChange={(e) => setCustomDimensions(e.target.value)}
                      placeholder='e.g. 45" wide x 55" length'
                      className="w-full px-3 py-2 text-xs bg-white border border-[#DACABE] rounded-xl focus:outline-none focus:border-[#B25329]"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-[#403833] uppercase tracking-wider mb-2">
                    Target Date / Occasion
                  </label>
                  <input
                    type="date"
                    value={neededByDate}
                    onChange={(e) => setNeededByDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#F7F2EB] border border-[#DACABE] rounded-xl focus:outline-none focus:border-[#B25329]"
                  />
                </div>
              </div>

              {/* Step 5: Laser-Engraved Personalization & Notes */}
              <div>
                <label className="block text-xs font-bold text-[#403833] uppercase tracking-wider mb-1">
                  5. Monogram / Engraved Birch Tag (+ $10)
                </label>
                <p className="text-[11px] text-[#7B7068] mb-2">
                  Optional: A handmade natural birch tag hand-stitched into the border with your custom wording.
                </p>
                <input
                  type="text"
                  value={personalizationText}
                  onChange={(e) => setPersonalizationText(e.target.value)}
                  placeholder="e.g. 'For Baby Noah · With Love, Grandma · October 2026'"
                  maxLength={50}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DACABE] rounded-xl focus:outline-none focus:border-[#B25329]"
                />
              </div>

              {/* Step 6: Reference Photo Upload / Inspiration */}
              <div>
                <label className="block text-xs font-bold text-[#403833] uppercase tracking-wider mb-1">
                  6. Inspiration / Room Reference Photo
                </label>
                <div className="flex items-center gap-4">
                  <label className="cursor-pointer px-4 py-2 text-xs font-semibold text-[#5A4F47] bg-[#F3EBE0] hover:bg-[#EAE0D3] border border-[#DACABE] rounded-xl transition-colors flex items-center gap-2">
                    <Upload className="w-3.5 h-3.5 text-[#B25329]" />
                    <span>Upload Room / Yarn Swatch Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleSimulatedUpload}
                      className="hidden"
                    />
                  </label>
                  {referencePhotoPreview && (
                    <div className="flex items-center gap-2">
                      <img
                        src={referencePhotoPreview}
                        alt="Uploaded preview"
                        className="w-10 h-10 object-cover rounded-lg border border-[#D5C4B4]"
                      />
                      <span className="text-xs text-emerald-700 font-medium">Image attached</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Live Fair-Price & Craft Time Estimator Card */}
              <div className="p-4 bg-[#F2ECE1] rounded-2xl border border-[#DFD1C1] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] uppercase tracking-wider font-semibold text-[#8C5E43] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Artisan Time & Cost Estimate</span>
                  </div>
                  <div className="text-xs text-[#5A514B] mt-0.5">
                    Based on current pattern stitch density and non-mulesed organic fiber yardage.
                  </div>
                </div>

                <div className="flex items-baseline gap-3 shrink-0">
                  <div className="text-right">
                    <span className="text-xs text-[#7B7068] block">Est. Crafting:</span>
                    <span className="font-mono font-bold text-xs text-[#2D2825]">{estHours} hours</span>
                  </div>
                  <div className="text-right pl-3 border-l border-[#DACABE]">
                    <span className="text-xs text-[#7B7068] block">Estimated Quote:</span>
                    <span className="font-serif font-bold text-xl text-[#B25329] font-mono tabular-nums">
                      ${estPrice}
                    </span>
                  </div>
                </div>
              </div>

              {/* Customer Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-[#403833] uppercase tracking-wider mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Hannah Miller"
                    className="w-full px-3 py-2 text-xs bg-white border border-[#DACABE] rounded-xl focus:outline-none focus:border-[#B25329]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#403833] uppercase tracking-wider mb-1">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="hannah@example.com"
                    className="w-full px-3 py-2 text-xs bg-white border border-[#DACABE] rounded-xl focus:outline-none focus:border-[#B25329]"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 text-xs sm:text-sm font-semibold text-white bg-[#2D2825] hover:bg-[#403833] rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#CF9943]" />
                  <span>Submit Custom Commission Request</span>
                </button>
                <div className="text-[11px] text-center text-[#7B7068] mt-2">
                  No payment charged today. We will confirm thread swatches and delivery date with you first.
                </div>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
