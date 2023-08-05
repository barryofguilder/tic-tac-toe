import eq from 'ember-truth-helpers/helpers/eq';

<template>
  {{#if (eq @piece "poo")}}
    💩
  {{else if (eq @piece "face heart eyes")}}
    😍
  {{else if (eq @piece "silly face")}}
    🤪
  {{else if (eq @piece "horse rider")}}
    🏇
  {{else if (eq @piece "peanut")}}
    🥜
  {{/if}}
</template>
