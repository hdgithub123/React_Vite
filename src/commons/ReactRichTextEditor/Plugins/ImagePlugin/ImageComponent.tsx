import React, { forwardRef, useRef, useState } from 'react';
import { EditorState, AtomicBlockUtils, convertToRaw } from 'draft-js';
import Editor from '@draft-js-plugins/editor'


const ImageComponent = forwardRef(
    ({
        block, // eslint-disable-line no-unused-vars
        blockProps, // eslint-disable-line no-unused-vars
        customStyleMap, // eslint-disable-line no-unused-vars
        customStyleFn, // eslint-disable-line no-unused-vars
        decorator, // eslint-disable-line no-unused-vars
        forceSelection, // eslint-disable-line no-unused-vars
        offsetKey, // eslint-disable-line no-unused-vars
        selection, // eslint-disable-line no-unused-vars
        tree, // eslint-disable-line no-unused-vars
        contentState, // eslint-disable-line no-unused-vars
        blockStyleFn, // eslint-disable-line no-unused-vars
        preventScroll, // eslint-disable-line no-unused-vars
        style,
        onClick,
        ...elementProps
    },


        ref

    ) => {
        const entityKey = block.getEntityAt(0);
        const entity = contentState.getEntity(entityKey);
        const { url, width, height,unit, textAlign } = entity.getData();


        if (!entityKey) {
            return <div>Error: Invalid image entity.</div>;
        }

        const handleOnClick = () => {
            const blockInfo = {
                EntityKey: block.getEntityAt(0),
                url: url,
                width: width,
                height: height,
                unit:unit,
                textAlign: textAlign,
            }
            onClick(blockInfo)
        }



        return (
            <div
                style={{ width: '100%', height: '100%', textAlign: textAlign, border: 'black 1px solid' }}
            >
                <img
                    ref={ref}
                    {...elementProps}
                    onClick={handleOnClick}
                    src={url ? url : ''}
                    alt="Error Image!"
                    style={{ width: `${width}${unit}` || 'auto', height: `${height}${unit}` || 'auto', ...style }}
                />
            </div>


        );
    });


export default ImageComponent;