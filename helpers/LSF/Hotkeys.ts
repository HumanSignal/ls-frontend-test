function pressHotkey(hotkey: string) {
  cy.window()
    .then($win => {
      return $win.navigator.userAgent.match(/macintosh/i) !== null;
    })
    .then(isMacos => {
      const hotkeyString = isMacos ? hotkey.replace(/ctrl/g, "cmd") : hotkey;

      cy.get("body").type(hotkeyString);
    });
}

export const Hotkeys = {
  undo() {
    pressHotkey("{ctrl+z}");
  },

  redo() {
    pressHotkey("{ctrl+shift+z}");
  }
};
