import type {Metadata} from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: 'WorldStayGuide',
  description: 'Curated Pakistan travel packages, retreats, and destination guides.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Script
          id="remove-extension-hydration-attributes"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{__html: `
          (function removeExtensionHydrationAttributes() {
            var blockedAttributes = ['bis_skin_checked'];
            var blockedIds = ['rankseo-toolbar'];
            var blockedClasses = ['rankseo-hidden'];
            var originalSetAttribute = Element.prototype.setAttribute;

            function cleanNode(node) {
              if (!node || node.nodeType !== 1) return;

              if (blockedIds.indexOf(node.id) !== -1) {
                node.removeAttribute('id');
                node.setAttribute('hidden', '');
              }

              for (var classIndex = 0; classIndex < blockedClasses.length; classIndex += 1) {
                if (node.classList && node.classList.contains(blockedClasses[classIndex])) {
                  node.classList.remove(blockedClasses[classIndex]);
                  node.setAttribute('hidden', '');

                  if (!node.getAttribute('class')) {
                    node.removeAttribute('class');
                  }
                }
              }

              for (var i = 0; i < blockedAttributes.length; i += 1) {
                if (node.hasAttribute(blockedAttributes[i])) {
                  node.removeAttribute(blockedAttributes[i]);
                }
              }

              if (!node.querySelectorAll) return;

              var selector = blockedAttributes.map(function(attribute) {
                return '[' + attribute + ']';
              })
                .concat(blockedIds.map(function(id) {
                  return '#' + id;
                }))
                .concat(blockedClasses.map(function(className) {
                  return '.' + className;
                }))
                .join(',');
              var children = node.querySelectorAll(selector);

              for (var j = 0; j < children.length; j += 1) {
                if (blockedIds.indexOf(children[j].id) !== -1) {
                  children[j].removeAttribute('id');
                  children[j].setAttribute('hidden', '');
                }

                for (var childClassIndex = 0; childClassIndex < blockedClasses.length; childClassIndex += 1) {
                  if (children[j].classList && children[j].classList.contains(blockedClasses[childClassIndex])) {
                    children[j].classList.remove(blockedClasses[childClassIndex]);
                    children[j].setAttribute('hidden', '');

                    if (!children[j].getAttribute('class')) {
                      children[j].removeAttribute('class');
                    }
                  }
                }

                for (var k = 0; k < blockedAttributes.length; k += 1) {
                  children[j].removeAttribute(blockedAttributes[k]);
                }
              }
            }

            Element.prototype.setAttribute = function(name, value) {
              if (blockedAttributes.indexOf(String(name)) !== -1) {
                return;
              }

              if (String(name) === 'id' && blockedIds.indexOf(String(value)) !== -1) {
                originalSetAttribute.call(this, 'hidden', '');
                return;
              }

              if (String(name) === 'class' && blockedClasses.some(function(className) {
                return String(value).split(/\\s+/).indexOf(className) !== -1;
              })) {
                originalSetAttribute.call(this, 'hidden', '');
                return;
              }

              return originalSetAttribute.call(this, name, value);
            };

            cleanNode(document.documentElement);

            if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', function() {
                cleanNode(document.documentElement);
              }, { once: true });
            }

            queueMicrotask(function() {
              cleanNode(document.documentElement);
            });

            var observer = new MutationObserver(function(mutations) {
              for (var i = 0; i < mutations.length; i += 1) {
                var mutation = mutations[i];

                if (mutation.type === 'attributes') {
                  cleanNode(mutation.target);
                }

                for (var j = 0; j < mutation.addedNodes.length; j += 1) {
                  cleanNode(mutation.addedNodes[j]);
                }
              }
            });

            observer.observe(document.documentElement, {
              attributes: true,
              childList: true,
              subtree: true,
              attributeFilter: blockedAttributes.concat(['id', 'class']),
            });
          })();

          window.addEventListener('error', function(e) {
            if (e.message && e.message.includes('fetch of #<Window>')) {
              e.preventDefault();
              e.stopImmediatePropagation();
            }
          }, true);
          window.addEventListener('unhandledrejection', function(e) {
            if (e.reason && e.reason.message && e.reason.message.includes('fetch of #<Window>')) {
              e.preventDefault();
              e.stopImmediatePropagation();
            }
          }, true);
        `}} />
        {children}
      </body>
    </html>
  );
}
