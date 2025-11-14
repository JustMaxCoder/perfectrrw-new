
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Star } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { apiRequest } from "../lib/queryClient";
import type { Review } from "../../../shared/schema";

export default function ProductReviews({ productId }: { productId: string }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [formData, setFormData] = useState({
    customerName: "",
    comment: "",
  });

  const { data: reviews } = useQuery<Review[]>({
    queryKey: ["reviews", productId],
    queryFn: async () => {
      return await apiRequest("GET", `/api/products/${productId}/reviews`);
    },
  });

  const createReviewMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest("POST", `/api/products/${productId}/reviews`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", productId] });
      setShowForm(false);
      setFormData({ customerName: "", comment: "" });
      setRating(5);
      toast({
        title: "Dziękujemy!",
        description: "Twoja opinia została dodana.",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createReviewMutation.mutate({
      ...formData,
      rating,
    });
  };

  const averageRating = reviews && reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Opinie klientów</h2>
          {reviews && reviews.length > 0 && (
            <div className="flex items-center gap-2 mt-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= averageRating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {averageRating.toFixed(1)} ({reviews.length} opinii)
              </span>
            </div>
          )}
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Anuluj" : "Dodaj opinię"}
        </Button>
      </div>

      {showForm && (
        <Card className="p-6 mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Ocena</Label>
              <div className="flex gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`h-8 w-8 ${
                        star <= rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="customerName">Imię</Label>
              <Input
                id="customerName"
                required
                value={formData.customerName}
                onChange={(e) =>
                  setFormData({ ...formData, customerName: e.target.value })
                }
              />
            </div>

            <div>
              <Label htmlFor="comment">Opinia</Label>
              <Textarea
                id="comment"
                required
                value={formData.comment}
                onChange={(e) =>
                  setFormData({ ...formData, comment: e.target.value })
                }
                rows={4}
              />
            </div>

            <Button type="submit" disabled={createReviewMutation.isPending}>
              {createReviewMutation.isPending ? "Wysyłanie..." : "Wyślij opinię"}
            </Button>
          </form>
        </Card>
      )}

      <div className="space-y-4">
        {reviews && reviews.length > 0 ? (
          reviews.map((review) => (
            <Card key={review.id} className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold">{review.customerName}</p>
                  <div className="flex gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">
                  {new Date(review.createdAt).toLocaleDateString("pl-PL")}
                </span>
              </div>
              <p className="text-muted-foreground">{review.comment}</p>
            </Card>
          ))
        ) : (
          <p className="text-center text-muted-foreground py-8">
            Brak opinii. Bądź pierwszym, który wystawi opinię!
          </p>
        )}
      </div>
    </div>
  );
}
