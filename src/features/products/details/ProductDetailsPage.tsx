import React from "react";
import Editor from "./Editor/Editor";
import { useParams } from "react-router-dom";

const ProductDetailsPage: React.FC<any> = () => {
  const { productId } = useParams();
  return <Editor productId={productId} hideTabs={[]} />;
};

export default ProductDetailsPage;
