export default function GlobeSkeleton() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative h-48 w-48 sm:h-56 sm:w-56">
        <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-br from-fadig-green/20 to-fadig-red/10" />
        <div className="absolute inset-4 rounded-full border border-white/10" />
        <div className="absolute inset-10 rounded-full border border-white/5" />
      </div>
    </div>
  );
}
