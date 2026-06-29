import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../../../components/ui/sheet";

type RightPanelProps = {
  open: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export const RightPanel = ({
  open,
  title,
  description,
  onClose,
  children,
  footer,
}: RightPanelProps) => (
  <Sheet
    open={open}
    onOpenChange={(nextOpen) => {
      if (!nextOpen) onClose();
    }}
  >
    <SheetContent
      side="right"
      className="flex flex-col data-[side=right]:w-full data-[side=right]:max-w-md data-[side=right]:sm:max-w-md bg-stone-neutral-1/95 backdrop-blur-xl border-l border-stone-neutral-4 shadow-2xl p-0 gap-0"
    >
      <SheetHeader className="px-6 py-6 border-b border-stone-neutral-4 bg-white/50 backdrop-blur-sm shadow-sm">
        <SheetTitle className="text-2xl font-extrabold tracking-tight text-primary">{title}</SheetTitle>
        {description ? (
          <SheetDescription className="text-sm font-medium text-secondary-foreground mt-1">
            {description}
          </SheetDescription>
        ) : null}
      </SheetHeader>
      <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6">
        {children}
      </div>
      {footer && (
        <div className="p-4 sm:p-6 border-t border-stone-neutral-4 bg-white/50 backdrop-blur-xl">
          {footer}
        </div>
      )}
    </SheetContent>
  </Sheet>
);
