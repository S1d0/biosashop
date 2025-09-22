import React from 'react'

export function ProductSkeleton() {
  return (
    <div className="backdrop-blur-sm bg-card/30 p-6 md:p-8 rounded-xl border border-white/10 animate-pulse">
      <div className="space-y-6">
        {/* Title skeleton */}
        <div className="h-8 bg-muted/60 rounded w-3/4 mx-auto"></div>
        
        {/* Description skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-muted/40 rounded w-full"></div>
          <div className="h-4 bg-muted/40 rounded w-2/3 mx-auto"></div>
        </div>
        
        {/* Product grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-4">
              {/* Image skeleton */}
              <div className="aspect-square bg-muted/50 rounded-lg"></div>
              
              {/* Product info skeleton */}
              <div className="space-y-2">
                <div className="h-5 bg-muted/40 rounded w-3/4"></div>
                <div className="h-4 bg-muted/30 rounded w-1/2"></div>
                <div className="h-4 bg-muted/30 rounded w-2/3"></div>
              </div>
              
              {/* Button skeleton */}
              <div className="h-10 bg-muted/40 rounded-md"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function ProductsSectionSkeleton() {
  return (
    <section id="products" className="w-full py-12 md:py-16 lg:py-20 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            {/* Section title skeleton */}
            <div className="h-12 bg-muted/60 rounded w-96 mx-auto animate-pulse"></div>
            <div className="h-6 bg-muted/40 rounded w-[600px] mx-auto animate-pulse"></div>
          </div>
        </div>
        
        <div className="mx-auto max-w-7xl space-y-16 py-12">
          {/* Multiple product family skeletons */}
          {[...Array(2)].map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
