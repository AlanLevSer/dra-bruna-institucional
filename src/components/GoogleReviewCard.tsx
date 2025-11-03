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
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        {/* Header: Avatar + Nome */}
        <div className="flex items-start gap-4 mb-4">
          <Avatar className="w-10 h-10">
            <AvatarImage src={review.profile_photo_url} alt={review.author_name} />
            <AvatarFallback className="text-xs">
              {review.author_name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm truncate">{review.author_name}</p>
            <p className="text-xs text-muted-foreground">
              {review.relative_time_description}
            </p>
          </div>
        </div>

        {/* Rating Stars */}
        <div className="flex gap-1 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < review.rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-gray-200 text-gray-200"
              }`}
            />
          ))}
        </div>

        {/* Review Text */}
        <p className="text-sm text-muted-foreground leading-relaxed italic">
          "{displayText}"
        </p>

        {/* Read More Button */}
        {shouldTruncate && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-sm text-primary hover:underline mt-2 font-medium"
          >
            {expanded ? "Ler menos" : "Ler mais"}
          </button>
        )}
      </CardContent>
    </Card>
  );
};
