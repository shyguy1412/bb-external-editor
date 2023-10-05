import { NS } from "NetscriptDefinitions";

import {render, unmountComponentAtNode} from 'react-dom';
import React, {useState} from "react";

export async function main(ns: NS) {

  //i dont know a better way to open a window in bb, so feel free to use yours

  //print a string we can search for
  const ID = `SCRIPT_ID:${ns.pid}`;
  ns.tail(ns.pid, 'home');
  ns.print(ID);

  //wait for a bit to make sure the change took affect
  await new Promise<void>(resolve => setTimeout(() => resolve(), 100));

  //grab the actual html element
  const tailWindows = [...document.querySelectorAll('.react-resizable')];
  const spans = tailWindows.map(win => [...win.querySelectorAll('span')]).flat();
  const idSpan = spans.filter((cur) => cur.innerHTML == ID)[0];
  const windowEl = findRoot(idSpan);

  //now we can render our react stuff
  render(<div></div>, windowEl);

  if(false)useState();

  //make sure to unmount our react stuff on exit
  ns.atExit(() => {
    unmountComponentAtNode(windowEl);
  });

  //return a promise that resolves when the tail window gets closed so our script terminates properly
  return new Promise<void>(resolve => watchElForDeletion(windowEl, () => resolve()));
}

//find root of tail window
function findRoot(span: Element) {
  let el = span;
  while (!el.parentElement.classList.contains('react-resizable'))
    el = el.parentElement;
  return el;
}

function watchElForDeletion(elToWatch: Element, callback: () => void) {
  const parent = document.body;
  const observer = new MutationObserver(function (mutations) {

    // loop through all mutations
    mutations.forEach(function (mutation) {
      // check for changes to the child list
      if (mutation.type === 'childList') {
        mutation.removedNodes.forEach(node => !containsRecursive(node, elToWatch) || callback());
      }
    });
  });
  // start observing the parent - defaults to document body
  observer.observe(parent, { childList: true, subtree: true });
};

//check if an element is part of another elements subtree
function containsRecursive(container: Node | Element, child: Element) {
  if (!('children' in container)) return;
  return [...container.children].reduce((prev, cur) => prev || cur == child || containsRecursive(cur, child), false);
}
