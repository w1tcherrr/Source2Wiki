import DefaultAdmonitionTypes from '@theme-original/Admonition/Types';
import AdmonitionTypeLegacy from "./Type/Legacy";
import AdmonitionTypeNonFGD from "./Type/NonFGD";
import AdmonitionTypeTodo from "./Type/Todo";
import AdmonitionTypeBug from "./Type/Bug";

const AdmonitionTypes = {
    ...DefaultAdmonitionTypes,
    'legacy': AdmonitionTypeLegacy,
    'nonFGD': AdmonitionTypeNonFGD,
    'todo': AdmonitionTypeTodo,
    'bug': AdmonitionTypeBug,
}

export default AdmonitionTypes;