import React from 'react';
import { Page } from 'react-pdf';

const BASE_PDF_WIDTH = 940;

const getHotspotStyle = (hotspot) => ({
  left: `${hotspot.x}%`,
  top: `${hotspot.y}%`,
  width: `${hotspot.width}%`,
  height: `${hotspot.height}%`,
});

const HotspotIcon = ({ type, customIcon }) => {
  if (type === 'practice') {
    return null;
  }

  if (type === 'video') {
    return (
      <span className="w-0 h-0 border-y-[5px] border-y-transparent border-l-[8px] border-l-current ml-0.5" />
    );
  }

  if (customIcon && customIcon !== '▶' && customIcon !== '►') {
    return <span>{customIcon}</span>;
  }

  switch (type) {
    case 'start':
      return <span>→</span>;
    case 'quiz':
      return <span>?</span>;
    case 'lab':
      return <span>△</span>;
    case 'note':
      return <span>?</span>;
    case 'jump':
      return <span>➜</span>;
    default:
      return <span>•</span>;
  }
};

const getHotspotClass = (hotspot) => {
  const { type, variant } = hotspot;

  // Quan trọng: practice phải đứng trước ghost
  // để không bị render thành nút tròn + tooltip.
  if (type === 'practice') {
    return [
      'rounded-xl',
      'bg-slate-900/90',
      'text-white',
      'border',
      'border-slate-700',
      'shadow-lg',
      'px-3',
      'hover:bg-blue-700',
      'hover:border-blue-600',
      'hover:shadow-xl',
      'hover:-translate-y-0.5',
      'active:scale-95',
    ].join(' ');
  }

  if (variant === 'ghost') {
    return [
      'rounded-full',
      'bg-slate-100/85',
      'border',
      'border-slate-500/35',
      'backdrop-blur-[2px]',
      'text-slate-900',
      'shadow-sm',
      'hover:bg-slate-800/90',
      'hover:border-slate-900/50',
      'hover:text-white',
      'hover:shadow-lg',
      'hover:-translate-y-0.5',
      'active:scale-95',
    ].join(' ');
  }

  switch (type) {
    case 'start':
      return [
        'rounded-full',
        'bg-white/90',
        'backdrop-blur-md',
        'border',
        'border-white/70',
        'text-blue-700',
        'shadow-xl',
        'whitespace-nowrap',
        'hover:bg-blue-600',
        'hover:text-white',
        'hover:shadow-2xl',
        'hover:-translate-y-0.5',
        'active:scale-95',
      ].join(' ');

    case 'toc':
      return [
        'rounded-md',
        'bg-blue-500/0',
        'border',
        'border-transparent',
        'text-transparent',
        'hover:bg-blue-500/10',
        'hover:border-blue-400/30',
        'hover:text-blue-700',
        'hover:shadow-sm',
      ].join(' ');

    case 'video':
      return 'rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg';
    case 'quiz':
      return 'rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg';
    case 'lab':
      return 'rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg';
    case 'note':
      return 'rounded-full bg-amber-500 hover:bg-amber-600 text-white shadow-lg';
    case 'jump':
      return 'rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg';
    default:
      return 'rounded-full bg-gray-700 hover:bg-gray-800 text-white shadow-lg';
  }
};

const getGhostTooltipClass = (align) => {
  const base = [
    'pointer-events-none',
    'absolute',
    'top-1/2',
    '-translate-y-1/2',
    'min-w-[118px]',
    'max-w-[220px]',
    'rounded-lg',
    'border',
    'border-slate-700',
    'bg-slate-900/95',
    'px-3',
    'py-2',
    'text-[11px]',
    'font-semibold',
    'leading-snug',
    'text-white',
    'opacity-0',
    'shadow-lg',
    'transition-all',
    'duration-200',
    'group-hover:opacity-100',
    'z-50',
  ].join(' ');

  if (align === 'left') {
    return `${base} left-full ml-2 text-left`;
  }

  return `${base} right-full mr-2 text-right`;
};

const getTocTooltipClass = () => {
  return [
    'pointer-events-none',
    'absolute',
    'left-full',
    'ml-2',
    'top-1/2',
    '-translate-y-1/2',
    'w-max',
    'max-w-[260px]',
    'rounded-lg',
    'border',
    'border-blue-100',
    'bg-white/95',
    'px-3',
    'py-1.5',
    'text-[11px]',
    'font-bold',
    'leading-snug',
    'text-blue-700',
    'opacity-0',
    'shadow-md',
    'transition-all',
    'group-hover:opacity-100',
    'z-50',
  ].join(' ');
};

const InteractivePdfPage = ({
  pageNumber,
  width,
  hotspots = [],
  onHotspotClick,
  debugMode = false,
  onPageLoadError,
}) => {
  const scaleRatio = width / BASE_PDF_WIDTH;

  const startFontSize = Math.max(9, 20 * scaleRatio);
  const normalFontSize = Math.max(8, 14 * scaleRatio);
  const practiceFontSize = Math.max(9, 14 * scaleRatio);

  const handlePageClick = (e) => {
    if (!debugMode) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    console.log(`Page ${pageNumber}: x=${x.toFixed(2)}, y=${y.toFixed(2)}`);
  };

  return (
    <div
      className="relative mx-auto mb-8 bg-white shadow-2xl rounded-sm overflow-hidden textbook-page"
      onClick={handlePageClick}
    >
      <Page
        pageNumber={pageNumber}
        width={width}
        renderTextLayer={false}
        renderAnnotationLayer={false}
        onLoadError={onPageLoadError}
        onRenderError={onPageLoadError}
      />

      <div className="absolute inset-0 pointer-events-none">
        {hotspots.map((hotspot) => {
          const isToc = hotspot.type === 'toc';
          const isStart = hotspot.type === 'start';
          const isPractice = hotspot.type === 'practice';
          const isGhost = hotspot.variant === 'ghost' && !isPractice;

          return (
            <button
              key={hotspot.id}
              type="button"
              onClick={(e) => {
                e.stopPropagation();

                if (typeof onHotspotClick === 'function') {
                  onHotspotClick(hotspot);
                }
              }}
              style={getHotspotStyle(hotspot)}
              className={`group absolute pointer-events-auto transition-all duration-200 flex items-center justify-center gap-2 ${getHotspotClass(
                hotspot
              )}`}
              aria-label={hotspot.label}
            >
              {isToc ? (
                <>
                  <span className="absolute inset-0 rounded-md" />
                  <span className={getTocTooltipClass()}>
                    {hotspot.label}
                  </span>
                </>
              ) : isPractice ? (
                <span
                  className="font-black leading-none whitespace-nowrap"
                  style={{
                    fontSize: `${practiceFontSize}px`,
                  }}
                >
                  {hotspot.label}
                </span>
              ) : isGhost ? (
                <>
                  <span
                    className="leading-none font-black opacity-75 group-hover:opacity-100 group-hover:scale-110 transition-all flex items-center justify-center"
                    style={{
                      fontSize: `${normalFontSize}px`,
                    }}
                  >
                    <HotspotIcon type={hotspot.type} customIcon={hotspot.icon} />
                  </span>

                  <span className={getGhostTooltipClass(hotspot.align)}>
                    {hotspot.label}
                  </span>
                </>
              ) : (
                <>
                  <span
                    className={
                      isStart
                        ? 'font-black leading-none'
                        : 'font-bold leading-none'
                    }
                    style={{
                      fontSize: isStart
                        ? `${startFontSize}px`
                        : `${normalFontSize}px`,
                    }}
                  >
                    {isStart ? (
                      hotspot.label
                    ) : (
                      <HotspotIcon
                        type={hotspot.type}
                        customIcon={hotspot.icon}
                      />
                    )}
                  </span>

                  {isStart && (
                    <span
                      className="font-black leading-none"
                      style={{
                        fontSize: `${startFontSize}px`,
                      }}
                    >
                      <HotspotIcon
                        type={hotspot.type}
                        customIcon={hotspot.icon}
                      />
                    </span>
                  )}

                  {!isStart && (
                    <span
                      className="hidden sm:inline font-bold"
                      style={{
                        fontSize: `${Math.max(8, 12 * scaleRatio)}px`,
                      }}
                    >
                      {hotspot.label}
                    </span>
                  )}
                </>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default InteractivePdfPage;