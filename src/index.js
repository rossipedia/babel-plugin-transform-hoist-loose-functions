"use strict";

function hasStrictModeDirective(path) {
  const { directives } = path.isProgram() ? path.node : path.node.body;
  return directives.some(
    d =>
      d.value &&
      d.value.type === "DirectiveLiteral" &&
      d.value.value === "use strict"
  );
}

function isStrictMode(path) {
  while (path) {
    if (hasStrictModeDirective(path)) {
      return true;
    }
    path = path.getFunctionParent();
  }
  return false;
}

function isHoisted(path, parentFn) {
  const parentScope = path.scope.parent;
  const fnScope = parentFn.scope;

  return path.scope.parent === parentFn.scope;
}

module.exports = function({ types: t }) {
  return {
    name: "transform-hoist-loose-functions",
    visitor: {
      FunctionDeclaration: {
        exit(path) {
          const parentFn = path.getFunctionParent();
          if (isStrictMode(parentFn) || isHoisted(path, parentFn)) {
            return;
          }

          const container = parentFn.isProgram()
            ? parentFn
            : parentFn.get("body");

          container.unshiftContainer("body", t.clone(path.node));
          path.remove();
        }
      }
    }
  };
};
