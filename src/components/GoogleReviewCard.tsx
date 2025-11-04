import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { GoogleReview } from "@/types/google-reviews";
import { useState } from "react";

interface GoogleReviewCardProps {
  review: GoogleReview;
  variant?: "default" | "compact" | "minimal";
}

export const GoogleReviewCard = ({ review, variant = "default" }: GoogleReviewCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const maxLength = variant === "compact" ? 150 : 200;
  const shouldTruncate = review.text.length > maxLength;
  const displayText = expanded || !shouldTruncate
    ? review.text
    : `${review.text.substring(0, maxLength)}...`;

  if (variant === "minimal") {
    return (
      <div className="bg-card rounded-lg p-4 border border-border hover:shadow-md transition-shadow">
        <div className="flex gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${
                i < review.rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-gray-200 text-gray-200"
              }`}
            />
          ))}
        </div>
        <p className="text-sm text-muted-foreground mb-2 italic">
          "{displayText}"
        </p>
        {shouldTruncate && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-primary hover:underline"
          >
            {expanded ? "Ler menos" : "Ler mais"}
          </button>
        )}
        <p className="text-xs font-semibold text-foreground mt-2">
          {review.author_name}
        </p>
        <p className="text-xs text-muted-foreground">
          {review.relative_time_description}
        </p>
      </div>
    );
  }

  return (
    <Card className="h-full hover:shadow-hover transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-8 relative">
        {/* Google Logo - canto superior direito */}
        <div className="absolute top-6 right-6">
          <svg className="w-6 h-6 opacity-40" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
        </div>

        {/* Header: Avatar + Nome */}
        <div className="flex items-start gap-4 mb-6">
          <Avatar className="w-14 h-14 border-2 border-muted">
            <AvatarImage src={review.profile_photo_url} alt={review.author_name} />
            <AvatarFallback className="text-base font-semibold">
              {review.author_name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-lg truncate">{review.author_name}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {review.relative_time_description}
            </p>
          </div>
        </div>

        {/* Rating Stars */}
        <div className="flex gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < review.rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-gray-200 text-gray-200"
              }`}
            />
          ))}
        </div>

        {/* Review Text */}
        <p className="text-base text-muted-foreground leading-relaxed italic">
          "{displayText}"
        </p>

        {/* Read More Button */}
        {shouldTruncate && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-sm text-primary hover:underline mt-3 font-medium"
          >
            {expanded ? "Ler menos" : "Ler mais"}
          </button>
        )}
      </CardContent>
    </Card>
  );
};
