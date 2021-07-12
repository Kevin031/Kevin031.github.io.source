---
title: 实战总结：运用react+ts+mst实现动态化表单应用
date: 2020-04-02 19:35:00
categories:
  - 前端
tags:
  - Javascript
  - React
  - Typescript
  - MobxStateTree
---

使用``mobx-state-tree``定义的表单模型，主要是实现强类型定义，规范代码输出

```javascript
import { types, Instance, SnapshotOut } from 'mobx-state-tree'

export type IFormElement = ITextfieldElement | ITextareaElement | IRadiosElement | ICheckboxesElement | IMarkupElement | IDatetimeElement | IAmazonOrderElement | IOpinionScale | IEndingElement

const FormModel = types.model('Form', {
  id: types.identifier,
  title: types.string,
  elements: types.map(types.frozen<IFormElement>()),
  results: types.map(types.frozen({})),
  allowAnonymousSubmission: types.optional(types.boolean, true),
  accessRestricted: types.optional(types.boolean, false),
  displaySubmittedUsers: types.optional(types.boolean, false),
  open: types.optional(types.boolean, false),
  openTime: types.maybeNull(types.number),
  closeTime: types.maybeNull(types.number),
  description: types.maybeNull(types.string),
  confirmationUrl: types.maybeNull(types.string),
  category: types.frozen({}),
  limitTotal: types.maybeNull(types.number),
  submitLabel: types.optional(types.string, ''),
  isPreview: types.optional(types.boolean, false),
  previewIndex: types.optional(types.number, 0),
  theme: types.optional(ThemeModel, {}, [null]),
  settings: types.optional(SettingModel, {}, [null]),
  __history: types.array(types.string),
  __values: types.map(types.frozen()),
  uuid: types.optional(types.string, ''),
  draft: types.optional(types.boolean, true),
  progress: types.optional(types.number, 0)
}).views(self => {
  // 获取数据的方法以及计算方法...
}).actions(self => {
  // 更改数据的操作 
})
```

React组件初始化（预览模式）

```javascript
let formData = Object.assign({}, {
  id: 'preview',
  isPreview: true
})
this.form = FormModel.create(formData)
```

元素类型的分发和渲染

```javascript
render () {
  return <FormElementWrapper
    key={id}
    style={{
      ...defaultStyle,
      zIndex: this.form.currentElementKey === id ? 10 : 1
    }}>
    <FormElementRenderer
      id={id}
      element={element}
      index={index}
      onChange={this.onChange}
      onShowNext={this.onShowNext.bind(this)}
      onFinished={this.form.showEnding}
      onFillAgain={this.form.reset}
      handleSubmit={this.handleSubmit.bind(this)}
      showSubmit={this.form.isLastElement}
      getValue={this.form.getValue}
      isLastElement={this.form.isLastElement}
      setResult={this.form.setResult}
      { ...this.form.theme }
    />
  </FormElementWrapper>
}
```

