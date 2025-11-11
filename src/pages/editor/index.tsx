import React, { useMemo, useState, useEffect, useCallback } from 'react';
import EditorMain from './Main/Editor';
import EditorLeftBar from './LeftBar';
import EditorRightBar from './RightBar';
import { Allotment } from 'allotment';
import 'allotment/dist/style.css';

const EditorApp: React.FC = () => {
  return (
    <div className="h-full">
      <Allotment>
        <Allotment.Pane minSize={150} maxSize={300} preferredSize={200}>
          <EditorLeftBar />
        </Allotment.Pane>
        <Allotment.Pane minSize={400}>
          <EditorMain />
        </Allotment.Pane>
        <Allotment.Pane minSize={150} maxSize={300} preferredSize={200}>
          <EditorRightBar />
        </Allotment.Pane>
      </Allotment>
    </div>
  );
};

export default EditorApp;
