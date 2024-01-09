function pressHotkey(hotkey: string) {
  const isMacos = cy.window().then($win => {
    return $win.navigator.userAgent.match(/macos/) !== null;
  });

  const hotkeyString = isMacos ? hotkey.replace(/ctrl/g, "cmd") : hotkey;

  cy.get("body").type(hotkeyString);
}

export const Hotkeys = {
  undo() {
    pressHotkey("{ctrl+z}");
  },

  redo() {
    pressHotkey("{ctrl+shift+z}");
  }
};
