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
};

export const RightPanel = ({
  open,
  title,
  description,
  onClose,
  children,
}: RightPanelProps) => (
  <Sheet
    open={open}
    onOpenChange={(nextOpen) => {
      if (!nextOpen) onClose();
    }}
  >
    <SheetContent
      side="right"
      className="flex flex-col data-[side=right]:w-full data-[side=right]:max-w-md data-[side=right]:sm:max-w-md"
    >
      <SheetHeader>
        <SheetTitle>{title}</SheetTitle>
        {description ? (
          <SheetDescription>{description}</SheetDescription>
        ) : null}
      </SheetHeader>
      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4 sm:px-6 sm:pb-6">
        {children}
      </div>
    </SheetContent>
  </Sheet>
);
