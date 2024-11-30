import { closify } from '../closify.js'
import { entify } from '../entify.js'
import { minify } from '../minify.js'
import { prettify } from '../prettify.js'
import { expect, test } from 'vitest'

const ugly_html = `<form id="3"     >     <!-- 
      
This is a comment. --><!-- This is a second comment. --><label for="email-0">

What's your email?</label><input id="email-0" type="email" 
title="We need your email for verification." name="email" required><!--    This is another comment. -->
<label for="1">What fruits do you like?</label><fieldset id="1">
<input id="fruits-1-0" type="checkbox" name="fruits" value="apples">
<label for="fruits-1-0"  >Apples<  /label><br><div><!--      This is an embedded comment. --></div>
<input id="fruits-1-1" type="checkbox" name="fruits" value="grapes">
<label for="fruits-1-1">Grapes</label><br></fieldset>     
<textarea  >

  Did   you know that 3 >   2?

This is another paragraph.   


 </textarea><textarea class="  more  stuff  ">    </textarea>
<br>
</form>`

const entify_html = `<textarea  >

Did   you know that 3 >   2?

This is another paragraph.   


</textarea><textarea class="  more  stuff  ">    </textarea>`

const pretty_html = `<form id="3">
<!-- This is a comment. -->
<!-- This is a second comment. -->
<label for="email-0">What's your email?</label>
<input id="email-0" type="email" title="We need your email for verification." name="email" required />
<!-- This is another comment. -->
<label for="1">What fruits do you like?</label>
<fieldset id="1">
  <input id="fruits-1-0" type="checkbox" name="fruits" value="apples" />
  <label for="fruits-1-0">Apples</label>
  <br />
  <div>
    <!-- This is an embedded comment. -->
  </div>
  <input id="fruits-1-1" type="checkbox" name="fruits" value="grapes" />
  <label for="fruits-1-1">Grapes</label>
  <br />
</fieldset>
<textarea>Did you know that 3 &gt; 2?&#13;&#13;This is another paragraph.</textarea>
<textarea class="more stuff"></textarea>
<br>
</form>`

const closify_html = `<form id="3">
<!-- This is a comment. -->
<!-- This is a second comment. --><br><input><br><input></form>`

const config_html = `<form id="3">
<!-- This is a comment. -->
<!-- This is a second comment. --><div><br /><input /><br /><input /><div></div></div></form>`


test('Prettify', () => {
  expect(prettify(ugly_html)).toBe(
`<form id="3">
  <!-- This is a comment. -->
  <!-- This is a second comment. -->
  <label for="email-0">What's your email?</label>
  <input id="email-0" type="email" title="We need your email for verification." name="email" required />
  <!-- This is another comment. -->
  <label for="1">What fruits do you like?</label>
  <fieldset id="1">
    <input id="fruits-1-0" type="checkbox" name="fruits" value="apples" />
    <label for="fruits-1-0">Apples</label>
    <br />
    <div>
      <!-- This is an embedded comment. -->
    </div>
    <input id="fruits-1-1" type="checkbox" name="fruits" value="grapes" />
    <label for="fruits-1-1">Grapes</label>
    <br />
  </fieldset>
  <textarea>Did you know that 3 &gt; 2?&#13;&#13;This is another paragraph.</textarea>
  <textarea class="more stuff"></textarea>
  <br />
</form>`
  )
})

test('Prettify with HTML check', () => {
  expect(prettify('No HTML')).toBe('No HTML')
})

test('Minify', () => {
  expect(minify(pretty_html)).toBe(
    `<form id="3"><!-- This is a comment. --><!-- This is a second comment. --><label for="email-0">What's your email?</label><input id="email-0" type="email" title="We need your email for verification." name="email" required /><!-- This is another comment. --><label for="1">What fruits do you like?</label><fieldset id="1"><input id="fruits-1-0" type="checkbox" name="fruits" value="apples" /><label for="fruits-1-0">Apples</label><br /><div><!-- This is an embedded comment. --></div><input id="fruits-1-1" type="checkbox" name="fruits" value="grapes" /><label for="fruits-1-1">Grapes</label><br /></fieldset><textarea>Did you know that 3 &gt; 2?&#13;&#13;This is another paragraph.</textarea><textarea class="more stuff"></textarea><br></form>`
  )
})

test('Minify with HTML check', () => {
  expect(minify('No HTML', true)).toBe('No HTML')
})

test('Entify', () => {
  expect(entify(entify_html)).toBe(
    `<textarea  >Did   you know that 3 &gt;   2?&#13;&#13;This is another paragraph.</textarea><textarea class="  more  stuff  "></textarea>`
  )
})

test('Entify with plain text', () => {
  expect(entify('Plain text')).toBe('Plain text')
})

test('Entify with minify', () => {
  expect(entify(entify_html, true)).toBe(
    `<textarea>Did you know that 3 &gt; 2?&#13;&#13;This is another paragraph.</textarea><textarea class="more stuff"></textarea>`
  )
})

test('Closify', () => {
  expect(closify(closify_html)).toBe(
`<form id="3">
<!-- This is a comment. -->
<!-- This is a second comment. --><br /><input /><br /><input /></form>`
  )
})

test('Closify with HTML check', () => {
  expect(closify('No HTML', true)).toBe('No HTML')
})

test('Strict config', () => {
  expect(prettify(config_html, { strict: true })).toBe(
`<form id="3">
  <div>
    <br>
    <input>
    <br>
    <input>
    <div></div>
  </div>
</form>`
  )
})

test('Tab size config', () => {
  expect(prettify(config_html, { tab_size: 4 })).toBe(
`<form id="3">
    <!-- This is a comment. -->
    <!-- This is a second comment. -->
    <div>
        <br />
        <input />
        <br />
        <input />
        <div></div>
    </div>
</form>`
  )
})
