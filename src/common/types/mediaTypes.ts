export type MediaType = "image" | "video" | "file" | "text";
export type ShowType = "box" | "button";

export type MediaProps = {
  src: string;
  onUpload: (src: string) => void;
  onRemove: () => void;
  type: MediaType;
  showType?: ShowType;
  width?: string;
  height?: string;
  noImageTitle?: string;
  noImageDescription?: string;
  noImageIcon?: React.ElementType;
  hideRemove?: boolean;
  readOnly?: boolean;
};
