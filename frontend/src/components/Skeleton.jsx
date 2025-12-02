const Skeleton = ({ className = '', variant = 'rectangular' }) => {
  const baseClasses = 'animate-pulse bg-gray-200 dark:bg-gray-700';
  
  const variantClasses = {
    rectangular: 'rounded-lg',
    circular: 'rounded-full',
    text: 'rounded h-4'
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`} />
  );
};

export const ProductCardSkeleton = () => {
  return (
    <div className="glass-strong rounded-2xl p-6 space-y-4">
      <Skeleton className="w-full h-48" />
      <Skeleton variant="text" className="w-3/4" />
      <Skeleton variant="text" className="w-1/2" />
      <div className="flex justify-between items-center pt-4">
        <Skeleton variant="text" className="w-1/4" />
        <Skeleton className="w-24 h-10 rounded-xl" />
      </div>
    </div>
  );
};

export const CartItemSkeleton = () => {
  return (
    <div className="glass p-6 rounded-xl flex items-center gap-4">
      <Skeleton variant="circular" className="w-20 h-20" />
      <div className="flex-1 space-y-2">
        <Skeleton variant="text" className="w-1/2" />
        <Skeleton variant="text" className="w-1/4" />
      </div>
      <Skeleton className="w-24 h-10 rounded-xl" />
    </div>
  );
};

export default Skeleton;
