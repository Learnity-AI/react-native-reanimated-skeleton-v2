var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { Children, useCallback } from 'react';
import { View } from 'react-native';
import { useRenderBone } from '../hooks';
import StaticBone from '../StaticBone';
import ShiverBone from '../ShiverBone';
export const useGetBones = (componentSize) => {
    const renderBone = useRenderBone(componentSize);
    const renderNestedBones = useCallback((bones, prefix, generalStyles) => {
        return bones.map((bone, index) => {
            const keyIndex = prefix ? `${prefix}_${index}` : index;
            const { children: childBones } = bone, layoutStyle = __rest(bone, ["children"]);
            if (childBones === null || childBones === void 0 ? void 0 : childBones.length) {
                return (<View key={keyIndex} style={layoutStyle}>
              {renderNestedBones(childBones, keyIndex, generalStyles)}
            </View>);
            }
            return renderBone({
                generalStyles,
                bonesLayout: bones,
                index,
                keyIndex,
            });
        });
    }, [renderBone]);
    return useCallback(({ bonesLayout, children, prefix, generalStyles }) => {
        if (bonesLayout && bonesLayout.length > 0) {
            return renderNestedBones(bonesLayout, prefix, generalStyles);
        }
        return Children.map(children, (child, i) => {
            const styling = child.props.style || {};
            if (generalStyles.animationType === 'pulse' ||
                generalStyles.animationType === 'none') {
                return (<StaticBone key={prefix ? `${prefix}_${i}` : i} index={i} boneLayout={styling} componentSize={componentSize} {...generalStyles}/>);
            }
            return (<ShiverBone index={prefix ? `${prefix}_${i}` : i} componentSize={componentSize} boneLayout={styling} {...generalStyles}/>);
        });
    }, [componentSize, renderNestedBones]);
};
