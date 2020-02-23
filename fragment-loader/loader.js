function documentFragmentFromString(content) {
    // generate mini document
    const result = document.createDocumentFragment();
    const container = document.createElement('div');

    container.innerHTML = content;

    while (container.firstChild) {
        result.appendChild(container.firstChild);
    }
    return result;
}
class FragmentLoader extends HTMLElement {
    async connectedCallback(){
        // console.log('>>> Connected');
        const href = this.getAttribute('href');
        const response = await fetch(href); //get fragment
        const content = await response.text(); //get the html by the text() method
        this.innerHTML = content; // append in our fragement-loader element
        const dummyFragment = documentFragmentFromString(content);
        console.log({
            // href,
            // content
            dummyFragment
        });
        const jsScriptTag = dummyFragment.querySelector('script');
        console.log({
            jsScriptTag
        });
        const jsUrl = jsScriptTag.getAttribute('src');
        console.log({
            jsUrl
        });
        const script = document.createElement('script');
        script.src = jsUrl;
        document.head.appendChild(script);
    }
}

window.customElements.define("fragment-loader", FragmentLoader);