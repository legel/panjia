## autoform Public API ##

Provides UI components that allow you to easily create forms with automatic insert and update events, and automatic reactive validation.

_API documentation automatically generated by [docmeteor](https://github.com/raix/docmeteor)._

-

### <a name="AutoForm.addHooks"></a>*AutoForm*.addHooks(formIds, hooks)&nbsp;&nbsp;<sub><i>Client</i></sub> ###

*This method __addHooks__ is defined in `AutoForm`*

__Arguments__

* __formIds__ *{[String[]](#String[])|String|null}*  

 Form `id` or array of form IDs to which these hooks apply. Specify `null` to add hooks that will run for every form.

* __hooks__ *{Object}*  

 Hooks to add, where supported names are "before", "after", "formToDoc", "docToForm", "onSubmit", "onSuccess", and "onError".


__Returns__  *{undefined}*


Defines hooks to be used by one or more forms. Extends hooks lists if called multiple times for the same
form.

> ```AutoForm.addHooks = function autoFormAddHooks(formIds, hooks, replace) { ...``` [autoform.js:20](autoform.js#L20)


-

### <a name="AutoForm.hooks"></a>*AutoForm*.hooks(hooks)&nbsp;&nbsp;<sub><i>Client</i></sub> ###

*This method __hooks__ is defined in `AutoForm`*

__Arguments__

* __hooks__ *{Object}*  

__Returns__  *{undefined}*


Defines hooks by form id. Extends hooks lists if called multiple times for the same
form.

> ```AutoForm.hooks = function autoFormHooks(hooks, replace) { ...``` [autoform.js:56](autoform.js#L56)


-

### <a name="AutoForm.resetForm"></a>*AutoForm*.resetForm(formId)&nbsp;&nbsp;<sub><i>Client</i></sub> ###

*This method __resetForm__ is defined in `AutoForm`*

__Arguments__

* __formId__ *{String}*  

__Returns__  *{undefined}*


Resets validation for an autoform.

> ```AutoForm.resetForm = function autoFormResetForm(formId) { ...``` [autoform.js:70](autoform.js#L70)


-

### <a name="AutoForm.setDefaultTemplateForType"></a>*AutoForm*.setDefaultTemplateForType(type, template)&nbsp;&nbsp;<sub><i>Client</i></sub> ###

*This method __setDefaultTemplateForType__ is defined in `AutoForm`*

__Arguments__

* __type__ *{String}*  
* __template__ *{String}*  


> ```AutoForm.setDefaultTemplateForType = function autoFormSetDefaultTemplateForType(type, template) { ...``` [autoform.js:138](autoform.js#L138)


-

### <a name="AutoForm.getDefaultTemplateForType"></a>*AutoForm*.getDefaultTemplateForType(type)&nbsp;&nbsp;<sub><i>Client</i></sub> ###

*This method __getDefaultTemplateForType__ is defined in `AutoForm`*

__Arguments__

* __type__ *{String}*  

__Returns__  *{String}*
Template name


Reactive.

> ```AutoForm.getDefaultTemplateForType = function autoFormGetDefaultTemplateForType(type) { ...``` [autoform.js:157](autoform.js#L157)


-

### <a name="AutoForm.getFormValues"></a>*AutoForm*.getFormValues(formId)&nbsp;&nbsp;<sub><i>Client</i></sub> ###

*This method __getFormValues__ is defined in `AutoForm`*

__Arguments__

* __formId__ *{String}*  

 The `id` attribute of the `autoForm` you want current values for.


__Returns__  *{Object}*


Returns an object representing the current values of all schema-based fields in the form.
The returned object contains two properties, "insertDoc" and "updateDoc", which represent
the field values as a normal object and as a MongoDB modifier, respectively.

> ```AutoForm.getFormValues = function autoFormGetFormValues(formId) { ...``` [autoform.js:175](autoform.js#L175)


-

### <a name="AutoForm.getFieldValue"></a>*AutoForm*.getFieldValue(formId, fieldName)&nbsp;&nbsp;<sub><i>Client</i></sub> ###

*This method __getFieldValue__ is defined in `AutoForm`*

__Arguments__

* __formId__ *{String}*  

 The `id` attribute of the `autoForm` you want current values for.

* __fieldName__ *{String}*  

 The name of the field for which you want the current value.


__Returns__  *{Any}*


Returns the value of the field (the value that would be used if the form were submitted right now).
This is a reactive method that will rerun whenever the current value of the requested field changes.

> ```AutoForm.getFieldValue = function autoFormGetFieldValue(formId, fieldName) { ...``` [autoform.js:197](autoform.js#L197)



-