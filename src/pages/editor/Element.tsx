const CodeElement = props => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

const ImageElement = props => {
  return (
    <div {...props.attributes}>
      <img src={props.element.attributes.src} alt="" />
    </div>
  );
};

const DefaultElement = props => {
  return <p {...props.attributes}>{props.children}</p>;
};

const ContentElement = props => {
  return (
    <div {...props.attributes}>
      <span className="dmodule-span right-arrow">{props.element.type}</span>
      <div className="min-h-6">{props.children}</div>
      <span className="dmodule-span left-arrow">{props.element.type}</span>
    </div>
  );
};

const DModuleElement = props => {
  return (
    <div {...props.attributes}>
      <span className="dmodule-span right-arrow">{props.element.type}</span>
      <div className="min-h-6">{props.children}</div>
      <span className="dmodule-span left-arrow">{props.element.type}</span>
    </div>
  );
};

const IdentAndStatusSectionElement = props => {
  return (
    <div {...props.attributes}>
      <span className="dmodule-span right-arrow">{props.element.type}</span>
      <div className="min-h-6">{props.children}</div>
      <span className="dmodule-span left-arrow">{props.element.type}</span>
    </div>
  );
};

export const Element = (props: any) => {
  const { attributes, children, element } = props;
  switch (element.type) {
    case 'code':
      return <CodeElement {...props} />;
    case 'image':
      return <ImageElement {...props} />;
    case 'content':
      return <ContentElement {...props} />;
    case 'dmodule':
      return <DModuleElement {...props} />;
    case 'identAndStatusSection':
      return <IdentAndStatusSectionElement {...props} />;
    default:
      return <DefaultElement {...props} />;
    // case 'block-quote':
    //   return (
    //     <blockquote style={style} {...attributes}>
    //       {children}
    //     </blockquote>
    //   );
    // case 'bulleted-list':
    //   return (
    //     <ul style={style} {...attributes}>
    //       {children}
    //     </ul>
    //   );
    // case 'heading-one':
    //   return (
    //     <h1 style={style} {...attributes}>
    //       {children}
    //     </h1>
    //   );
    // case 'heading-two':
    //   return (
    //     <h2 style={style} {...attributes}>
    //       {children}
    //     </h2>
    //   );
    // case 'list-item':
    //   return (
    //     <li style={style} {...attributes}>
    //       {children}
    //     </li>
    //   );
    // case 'numbered-list':
    //   return (
    //     <ol style={style} {...attributes}>
    //       {children}
    //     </ol>
    //   );
    // case 'paragraph':
    //   return (
    //     <p style={style} {...attributes}>
    //       {children}
    //     </p>
    //   );
  }
};
