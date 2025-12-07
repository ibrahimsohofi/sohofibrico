import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
  onAction
}) {
  return (
    <div className="flex items-center justify-center min-h-[400px] p-4">
      <Card className="max-w-md w-full">
        <CardContent className="pt-12 pb-12 text-center space-y-4">
          {Icon && (
            <div className="flex justify-center">
              <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center">
                <Icon className="h-10 w-10 text-muted-foreground" />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <h3 className="text-2xl font-bold">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
          </div>

          {(actionLabel && (actionHref || onAction)) && (
            <div className="pt-2">
              {actionHref ? (
                <Button asChild>
                  <a href={actionHref}>{actionLabel}</a>
                </Button>
              ) : (
                <Button onClick={onAction}>{actionLabel}</Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
