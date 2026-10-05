import { i as __toESM, t as __commonJSMin } from "../_runtime.mjs";
//#region node_modules/react/cjs/react.production.js
/**
* @license React
* react.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element");
	var REACT_PORTAL_TYPE = Symbol.for("react.portal");
	var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
	var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
	var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
	var REACT_CONSUMER_TYPE = Symbol.for("react.consumer");
	var REACT_CONTEXT_TYPE = Symbol.for("react.context");
	var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
	var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
	var REACT_MEMO_TYPE = Symbol.for("react.memo");
	var REACT_LAZY_TYPE = Symbol.for("react.lazy");
	var REACT_ACTIVITY_TYPE = Symbol.for("react.activity");
	var REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition");
	var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
	function getIteratorFn(maybeIterable) {
		if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
		maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
		return "function" === typeof maybeIterable ? maybeIterable : null;
	}
	var ReactNoopUpdateQueue = {
		isMounted: function() {
			return !1;
		},
		enqueueForceUpdate: function() {},
		enqueueReplaceState: function() {},
		enqueueSetState: function() {}
	};
	var assign = Object.assign;
	var emptyObject = {};
	function Component(props, context, updater) {
		this.props = props;
		this.context = context;
		this.refs = emptyObject;
		this.updater = updater || ReactNoopUpdateQueue;
	}
	Component.prototype.isReactComponent = {};
	Component.prototype.setState = function(partialState, callback) {
		if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
		this.updater.enqueueSetState(this, partialState, callback, "setState");
	};
	Component.prototype.forceUpdate = function(callback) {
		this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
	};
	function ComponentDummy() {}
	ComponentDummy.prototype = Component.prototype;
	function PureComponent(props, context, updater) {
		this.props = props;
		this.context = context;
		this.refs = emptyObject;
		this.updater = updater || ReactNoopUpdateQueue;
	}
	var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
	pureComponentPrototype.constructor = PureComponent;
	assign(pureComponentPrototype, Component.prototype);
	pureComponentPrototype.isPureReactComponent = !0;
	var isArrayImpl = Array.isArray;
	function noop() {}
	var ReactSharedInternals = {
		H: null,
		A: null,
		T: null,
		S: null
	};
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	function ReactElement(type, key, props) {
		var refProp = props.ref;
		return {
			$$typeof: REACT_ELEMENT_TYPE,
			type,
			key,
			ref: void 0 !== refProp ? refProp : null,
			props
		};
	}
	function cloneAndReplaceKey(oldElement, newKey) {
		return ReactElement(oldElement.type, newKey, oldElement.props);
	}
	function isValidElement(object) {
		return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
	}
	function escape(key) {
		var escaperLookup = {
			"=": "=0",
			":": "=2"
		};
		return "$" + key.replace(/[=:]/g, function(match) {
			return escaperLookup[match];
		});
	}
	var userProvidedKeyEscapeRegex = /\/+/g;
	function getElementKey(element, index) {
		return "object" === typeof element && null !== element && null != element.key ? escape("" + element.key) : index.toString(36);
	}
	function resolveThenable(thenable) {
		switch (thenable.status) {
			case "fulfilled": return thenable.value;
			case "rejected": throw thenable.reason;
			default: switch ("string" === typeof thenable.status ? thenable.then(noop, noop) : (thenable.status = "pending", thenable.then(function(fulfilledValue) {
				"pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
			}, function(error) {
				"pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
			})), thenable.status) {
				case "fulfilled": return thenable.value;
				case "rejected": throw thenable.reason;
			}
		}
		throw thenable;
	}
	function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
		var type = typeof children;
		if ("undefined" === type || "boolean" === type) children = null;
		var invokeCallback = !1;
		if (null === children) invokeCallback = !0;
		else switch (type) {
			case "bigint":
			case "string":
			case "number":
				invokeCallback = !0;
				break;
			case "object": switch (children.$$typeof) {
				case REACT_ELEMENT_TYPE:
				case REACT_PORTAL_TYPE:
					invokeCallback = !0;
					break;
				case REACT_LAZY_TYPE: return invokeCallback = children._init, mapIntoArray(invokeCallback(children._payload), array, escapedPrefix, nameSoFar, callback);
			}
		}
		if (invokeCallback) return callback = callback(children), invokeCallback = "" === nameSoFar ? "." + getElementKey(children, 0) : nameSoFar, isArrayImpl(callback) ? (escapedPrefix = "", null != invokeCallback && (escapedPrefix = invokeCallback.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
			return c;
		})) : null != callback && (isValidElement(callback) && (callback = cloneAndReplaceKey(callback, escapedPrefix + (null == callback.key || children && children.key === callback.key ? "" : ("" + callback.key).replace(userProvidedKeyEscapeRegex, "$&/") + "/") + invokeCallback)), array.push(callback)), 1;
		invokeCallback = 0;
		var nextNamePrefix = "" === nameSoFar ? "." : nameSoFar + ":";
		if (isArrayImpl(children)) for (var i = 0; i < children.length; i++) nameSoFar = children[i], type = nextNamePrefix + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
		else if (i = getIteratorFn(children), "function" === typeof i) for (children = i.call(children), i = 0; !(nameSoFar = children.next()).done;) nameSoFar = nameSoFar.value, type = nextNamePrefix + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
		else if ("object" === type) {
			if ("function" === typeof children.then) return mapIntoArray(resolveThenable(children), array, escapedPrefix, nameSoFar, callback);
			array = String(children);
			throw Error("Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead.");
		}
		return invokeCallback;
	}
	function mapChildren(children, func, context) {
		if (null == children) return children;
		var result = [], count = 0;
		mapIntoArray(children, result, "", "", function(child) {
			return func.call(context, child, count++);
		});
		return result;
	}
	function lazyInitializer(payload) {
		if (-1 === payload._status) {
			var ctor = payload._result, thenable = ctor();
			thenable.then(function(moduleObject) {
				if (0 === payload._status || -1 === payload._status) payload._status = 1, payload._result = moduleObject, void 0 === thenable.status && (thenable.status = "fulfilled", thenable.value = moduleObject);
			}, function(error) {
				if (0 === payload._status || -1 === payload._status) payload._status = 2, payload._result = error, void 0 === thenable.status && (thenable.status = "rejected", thenable.reason = error);
			});
			-1 === payload._status && (payload._status = 0, payload._result = thenable);
		}
		if (1 === payload._status) return payload._result.default;
		throw payload._result;
	}
	var reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
		if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
			var event = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
				error
			});
			if (!window.dispatchEvent(event)) return;
		} else if ("object" === typeof process && "function" === typeof process.emit) {
			process.emit("uncaughtException", error);
			return;
		}
		console.error(error);
	};
	function startTransition(scope) {
		var prevTransition = ReactSharedInternals.T, currentTransition = {};
		currentTransition.types = null !== prevTransition ? prevTransition.types : null;
		ReactSharedInternals.T = currentTransition;
		try {
			var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals.S;
			null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
			"object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && returnValue.then(noop, reportGlobalError);
		} catch (error) {
			reportGlobalError(error);
		} finally {
			null !== prevTransition && null !== currentTransition.types && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
		}
	}
	function addTransitionType(type) {
		var transition = ReactSharedInternals.T;
		if (null !== transition) {
			var transitionTypes = transition.types;
			null === transitionTypes ? transition.types = [type] : -1 === transitionTypes.indexOf(type) && transitionTypes.push(type);
		} else startTransition(addTransitionType.bind(null, type));
	}
	var Children = {
		map: mapChildren,
		forEach: function(children, forEachFunc, forEachContext) {
			mapChildren(children, function() {
				forEachFunc.apply(this, arguments);
			}, forEachContext);
		},
		count: function(children) {
			var n = 0;
			mapChildren(children, function() {
				n++;
			});
			return n;
		},
		toArray: function(children) {
			return mapChildren(children, function(child) {
				return child;
			}) || [];
		},
		only: function(children) {
			if (!isValidElement(children)) throw Error("React.Children.only expected to receive a single React element child.");
			return children;
		}
	};
	exports.Activity = REACT_ACTIVITY_TYPE;
	exports.Children = Children;
	exports.Component = Component;
	exports.Fragment = REACT_FRAGMENT_TYPE;
	exports.Profiler = REACT_PROFILER_TYPE;
	exports.PureComponent = PureComponent;
	exports.StrictMode = REACT_STRICT_MODE_TYPE;
	exports.Suspense = REACT_SUSPENSE_TYPE;
	exports.ViewTransition = REACT_VIEW_TRANSITION_TYPE;
	exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
	exports.__COMPILER_RUNTIME = {
		__proto__: null,
		c: function(size) {
			return ReactSharedInternals.H.useMemoCache(size);
		}
	};
	exports.addTransitionType = addTransitionType;
	exports.cache = function(fn) {
		return function() {
			return fn.apply(null, arguments);
		};
	};
	exports.cacheSignal = function() {
		return null;
	};
	exports.cloneElement = function(element, config, children) {
		if (null === element || void 0 === element) throw Error("The argument must be a React element, but you passed " + element + ".");
		var props = assign({}, element.props), key = element.key;
		if (null != config) for (propName in void 0 !== config.key && (key = "" + config.key), config) !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
		var propName = arguments.length - 2;
		if (1 === propName) props.children = children;
		else if (1 < propName) {
			for (var childArray = Array(propName), i = 0; i < propName; i++) childArray[i] = arguments[i + 2];
			props.children = childArray;
		}
		return ReactElement(element.type, key, props);
	};
	exports.createContext = function(defaultValue) {
		defaultValue = {
			$$typeof: REACT_CONTEXT_TYPE,
			_currentValue: defaultValue,
			_currentValue2: defaultValue,
			_threadCount: 0,
			Provider: null,
			Consumer: null
		};
		defaultValue.Provider = defaultValue;
		defaultValue.Consumer = {
			$$typeof: REACT_CONSUMER_TYPE,
			_context: defaultValue
		};
		return defaultValue;
	};
	exports.createElement = function(type, config, children) {
		var propName, props = {}, key = null;
		if (null != config) for (propName in void 0 !== config.key && (key = "" + config.key), config) hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (props[propName] = config[propName]);
		var childrenLength = arguments.length - 2;
		if (1 === childrenLength) props.children = children;
		else if (1 < childrenLength) {
			for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 2];
			props.children = childArray;
		}
		if (type && type.defaultProps) for (propName in childrenLength = type.defaultProps, childrenLength) void 0 === props[propName] && (props[propName] = childrenLength[propName]);
		return ReactElement(type, key, props);
	};
	exports.createRef = function() {
		return { current: null };
	};
	exports.forwardRef = function(render) {
		return {
			$$typeof: REACT_FORWARD_REF_TYPE,
			render
		};
	};
	exports.isValidElement = isValidElement;
	exports.lazy = function(ctor) {
		return {
			$$typeof: REACT_LAZY_TYPE,
			_payload: {
				_status: -1,
				_result: ctor
			},
			_init: lazyInitializer
		};
	};
	exports.memo = function(type, compare) {
		return {
			$$typeof: REACT_MEMO_TYPE,
			type,
			compare: void 0 === compare ? null : compare
		};
	};
	exports.startTransition = startTransition;
	exports.unstable_useCacheRefresh = function() {
		return ReactSharedInternals.H.useCacheRefresh();
	};
	exports.use = function(usable) {
		return ReactSharedInternals.H.use(usable);
	};
	exports.useActionState = function(action, initialState, permalink) {
		return ReactSharedInternals.H.useActionState(action, initialState, permalink);
	};
	exports.useCallback = function(callback, deps) {
		return ReactSharedInternals.H.useCallback(callback, deps);
	};
	exports.useContext = function(Context) {
		return ReactSharedInternals.H.useContext(Context);
	};
	exports.useDebugValue = function() {};
	exports.useDeferredValue = function(value, initialValue) {
		return ReactSharedInternals.H.useDeferredValue(value, initialValue);
	};
	exports.useEffect = function(create, deps) {
		return ReactSharedInternals.H.useEffect(create, deps);
	};
	exports.useEffectEvent = function(callback) {
		return ReactSharedInternals.H.useEffectEvent(callback);
	};
	exports.useId = function() {
		return ReactSharedInternals.H.useId();
	};
	exports.useImperativeHandle = function(ref, create, deps) {
		return ReactSharedInternals.H.useImperativeHandle(ref, create, deps);
	};
	exports.useInsertionEffect = function(create, deps) {
		return ReactSharedInternals.H.useInsertionEffect(create, deps);
	};
	exports.useLayoutEffect = function(create, deps) {
		return ReactSharedInternals.H.useLayoutEffect(create, deps);
	};
	exports.useMemo = function(create, deps) {
		return ReactSharedInternals.H.useMemo(create, deps);
	};
	exports.useOptimistic = function(passthrough, reducer) {
		return ReactSharedInternals.H.useOptimistic(passthrough, reducer);
	};
	exports.useReducer = function(reducer, initialArg, init) {
		return ReactSharedInternals.H.useReducer(reducer, initialArg, init);
	};
	exports.useRef = function(initialValue) {
		return ReactSharedInternals.H.useRef(initialValue);
	};
	exports.useState = function(initialState) {
		return ReactSharedInternals.H.useState(initialState);
	};
	exports.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
		return ReactSharedInternals.H.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
	};
	exports.useTransition = function() {
		return ReactSharedInternals.H.useTransition();
	};
	exports.version = "19.3.0";
}));
//#endregion
//#region node_modules/react/index.js
var require_react = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_react_production();
}));
//#endregion
//#region node_modules/@formkit/auto-animate/index.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/**
* A set of all the parents currently being observe. This is the only non weak
* registry.
*/
var parents = /* @__PURE__ */ new Set();
/**
* Element coordinates that is constantly kept up to date.
*/
var coords = /* @__PURE__ */ new WeakMap();
/**
* Siblings of elements that have been removed from the dom.
*/
var siblings = /* @__PURE__ */ new WeakMap();
/**
* Animations that are currently running.
*/
var animations = /* @__PURE__ */ new WeakMap();
/**
* A map of existing intersection observers used to track element movements.
*/
var intersections = /* @__PURE__ */ new WeakMap();
/**
* A map of existing mutation observers used to track element movements.
*/
var mutationObservers = /* @__PURE__ */ new WeakMap();
/**
* Intervals for automatically checking the position of elements occasionally.
*/
var intervals = /* @__PURE__ */ new WeakMap();
/**
* The configuration options for each group of elements.
*/
var options = /* @__PURE__ */ new WeakMap();
/**
* Debounce counters by id, used to debounce calls to update positions.
*/
var debounces = /* @__PURE__ */ new WeakMap();
/**
* All parents that are currently enabled are tracked here.
*/
var enabled = /* @__PURE__ */ new WeakSet();
/**
* The document used to calculate transitions.
*/
var root;
/**
* The root’s XY scroll positions.
*/
var scrollX = 0;
var scrollY = 0;
/**
* Used to sign an element as the target.
*/
var TGT = "__aa_tgt";
/**
* Used to sign an element as being part of a removal.
*/
var DEL = "__aa_del";
/**
* Used to sign an element as being "new". When an element is removed from the
* dom, but may cycle back in we can sign it with new to ensure the next time
* it is recognized we consider it new.
*/
var NEW = "__aa_new";
/**
* Callback for handling all mutations.
* @param mutations - A mutation list
*/
var handleMutations = (mutations) => {
	const elements = getElements(mutations);
	if (elements) elements.forEach((el) => animate(el));
};
/**
*
* @param entries - Elements that have been resized.
*/
var handleResizes = (entries) => {
	entries.forEach((entry) => {
		if (entry.target === root) updateAllPos();
		if (coords.has(entry.target)) updatePos(entry.target);
	});
};
/**
* Determine if an element is fully outside of the current viewport.
* @param el - Element to test
*/
function isOffscreen(el) {
	const rect = el.getBoundingClientRect();
	const vw = (root === null || root === void 0 ? void 0 : root.clientWidth) || 0;
	const vh = (root === null || root === void 0 ? void 0 : root.clientHeight) || 0;
	return rect.bottom < 0 || rect.top > vh || rect.right < 0 || rect.left > vw;
}
/**
* Observe this elements position.
* @param el - The element to observe the position of.
*/
function observePosition(el) {
	const oldObserver = intersections.get(el);
	oldObserver === null || oldObserver === void 0 || oldObserver.disconnect();
	let rect = coords.get(el);
	let invocations = 0;
	const buffer = 5;
	if (!rect) {
		rect = getCoords(el);
		coords.set(el, rect);
	}
	const { offsetWidth, offsetHeight } = root;
	const rootMargin = [
		rect.top - buffer,
		offsetWidth - (rect.left + buffer + rect.width),
		offsetHeight - (rect.top + buffer + rect.height),
		rect.left - buffer
	].map((px) => `${-1 * Math.floor(px)}px`).join(" ");
	const observer = new IntersectionObserver(() => {
		++invocations > 1 && updatePos(el);
	}, {
		root,
		threshold: 1,
		rootMargin
	});
	observer.observe(el);
	intersections.set(el, observer);
}
/**
* Update the exact position of a given element.
* @param el - An element to update the position of.
* @param debounce - Whether or not to debounce the update. After an animation is finished, it should update as soon as possible to prevent flickering on quick toggles.
*/
function updatePos(el, debounce = true) {
	clearTimeout(debounces.get(el));
	const optionsOrPlugin = getOptions(el);
	const delay = debounce ? isPlugin(optionsOrPlugin) ? 500 : optionsOrPlugin.duration : 0;
	debounces.set(el, setTimeout(async () => {
		const currentAnimation = animations.get(el);
		try {
			await (currentAnimation === null || currentAnimation === void 0 ? void 0 : currentAnimation.finished);
			coords.set(el, getCoords(el));
			observePosition(el);
		} catch {}
	}, delay));
}
/**
* Updates all positions that are currently being tracked.
*/
function updateAllPos() {
	clearTimeout(debounces.get(root));
	debounces.set(root, setTimeout(() => {
		parents.forEach((parent) => forEach(parent, (el) => lowPriority(() => updatePos(el))));
	}, 100));
}
/**
* Its possible for a quick scroll or other fast events to get past the
* intersection observer, so occasionally we need want "cold-poll" for the
* latests and greatest position. We try to do this in the most non-disruptive
* fashion possible. First we only do this ever couple seconds, staggard by a
* random offset.
* @param el - Element
*/
function poll(el) {
	setTimeout(() => {
		intervals.set(el, setInterval(() => lowPriority(updatePos.bind(null, el)), 2e3));
	}, Math.round(2e3 * Math.random()));
}
/**
* Perform some operation that is non critical at some point.
* @param callback
*/
function lowPriority(callback) {
	if (typeof requestIdleCallback === "function") requestIdleCallback(() => callback());
	else requestAnimationFrame(() => callback());
}
/**
* A resize observer, responsible for recalculating elements on resize.
*/
var resize;
/**
* Ensure the browser is supported.
*/
var supportedBrowser = typeof window !== "undefined" && "ResizeObserver" in window;
/**
* If this is in a browser, initialize our Web APIs
*/
if (supportedBrowser) {
	root = document.documentElement;
	new MutationObserver(handleMutations);
	resize = new ResizeObserver(handleResizes);
	window.addEventListener("scroll", () => {
		scrollY = window.scrollY;
		scrollX = window.scrollX;
	});
	resize.observe(root);
}
/**
* Retrieves all the elements that may have been affected by the last mutation
* including ones that have been removed and are no longer in the DOM.
* @param mutations - A mutation list.
* @returns
*/
function getElements(mutations) {
	if (mutations.reduce((nodes, mutation) => {
		return [
			...nodes,
			...Array.from(mutation.addedNodes),
			...Array.from(mutation.removedNodes)
		];
	}, []).every((node) => node.nodeName === "#comment")) return false;
	return mutations.reduce((elements, mutation) => {
		if (elements === false) return false;
		if (mutation.target instanceof Element) {
			target(mutation.target);
			if (!elements.has(mutation.target)) {
				elements.add(mutation.target);
				for (let i = 0; i < mutation.target.children.length; i++) {
					const child = mutation.target.children.item(i);
					if (!child) continue;
					if (DEL in child) return false;
					target(mutation.target, child);
					elements.add(child);
				}
			}
			if (mutation.removedNodes.length) for (let i = 0; i < mutation.removedNodes.length; i++) {
				const child = mutation.removedNodes[i];
				if (DEL in child) return false;
				if (child instanceof Element) {
					elements.add(child);
					target(mutation.target, child);
					siblings.set(child, [mutation.previousSibling, mutation.nextSibling]);
				}
			}
		}
		return elements;
	}, /* @__PURE__ */ new Set());
}
/**
* Assign the target to an element.
* @param el - The root element
* @param child
*/
function target(el, child) {
	if (!child && !(TGT in el)) Object.defineProperty(el, TGT, { value: el });
	else if (child && !(TGT in child)) Object.defineProperty(child, TGT, { value: el });
}
/**
* Determines what kind of change took place on the given element and then
* performs the proper animation based on that.
* @param el - The specific element to animate.
*/
function animate(el) {
	var _a, _b;
	const isMounted = el.isConnected;
	const preExisting = coords.has(el);
	if (isMounted && siblings.has(el)) siblings.delete(el);
	if (((_a = animations.get(el)) === null || _a === void 0 ? void 0 : _a.playState) !== "finished") (_b = animations.get(el)) === null || _b === void 0 || _b.cancel();
	if (NEW in el) add(el);
	else if (preExisting && isMounted) remain(el);
	else if (preExisting && !isMounted) remove(el);
	else add(el);
}
/**
* Removes all non-digits from a string and casts to a number.
* @param str - A string containing a pixel value.
* @returns
*/
function raw(str) {
	return Number(str.replace(/[^0-9.\-]/g, ""));
}
/**
* Get the scroll offset of elements
* @param el - Element
* @returns
*/
function getScrollOffset(el) {
	let p = el.parentElement;
	while (p) {
		if (p.scrollLeft || p.scrollTop) return {
			x: p.scrollLeft,
			y: p.scrollTop
		};
		p = p.parentElement;
	}
	return {
		x: 0,
		y: 0
	};
}
/**
* Get the coordinates of elements adjusted for scroll position.
* @param el - Element
* @returns
*/
function getCoords(el) {
	const rect = el.getBoundingClientRect();
	const { x, y } = getScrollOffset(el);
	return {
		top: rect.top + y,
		left: rect.left + x,
		width: rect.width,
		height: rect.height
	};
}
/**
* Returns the width/height that the element should be transitioned between.
* This takes into account box-sizing.
* @param el - Element being animated
* @param oldCoords - Old set of Coordinates coordinates
* @param newCoords - New set of Coordinates coordinates
* @returns
*/
function getTransitionSizes(el, oldCoords, newCoords) {
	let widthFrom = oldCoords.width;
	let heightFrom = oldCoords.height;
	let widthTo = newCoords.width;
	let heightTo = newCoords.height;
	const styles = getComputedStyle(el);
	if (styles.getPropertyValue("box-sizing") === "content-box") {
		const paddingY = raw(styles.paddingTop) + raw(styles.paddingBottom) + raw(styles.borderTopWidth) + raw(styles.borderBottomWidth);
		const paddingX = raw(styles.paddingLeft) + raw(styles.paddingRight) + raw(styles.borderRightWidth) + raw(styles.borderLeftWidth);
		widthFrom -= paddingX;
		widthTo -= paddingX;
		heightFrom -= paddingY;
		heightTo -= paddingY;
	}
	return [
		widthFrom,
		widthTo,
		heightFrom,
		heightTo
	].map(Math.round);
}
/**
* Retrieves animation options for the current element.
* @param el - Element to retrieve options for.
* @returns
*/
function getOptions(el) {
	return TGT in el && options.has(el[TGT]) ? options.get(el[TGT]) : {
		duration: 250,
		easing: "ease-in-out"
	};
}
/**
* Returns the target of a given animation (generally the parent).
* @param el - An element to check for a target
* @returns
*/
function getTarget(el) {
	if (TGT in el) return el[TGT];
}
/**
* Checks if animations are enabled or disabled for a given element.
* @param el - Any element
* @returns
*/
function isEnabled(el) {
	const target = getTarget(el);
	return target ? enabled.has(target) : false;
}
/**
* Iterate over the children of a given parent.
* @param parent - A parent element
* @param callback - A callback
*/
function forEach(parent, ...callbacks) {
	callbacks.forEach((callback) => callback(parent, options.has(parent)));
	for (let i = 0; i < parent.children.length; i++) {
		const child = parent.children.item(i);
		if (child) callbacks.forEach((callback) => callback(child, options.has(child)));
	}
}
/**
* Always return tuple to provide consistent interface
*/
function getPluginTuple(pluginReturn) {
	if (Array.isArray(pluginReturn)) return pluginReturn;
	return [pluginReturn];
}
/**
* Determine if config is plugin
*/
function isPlugin(config) {
	return typeof config === "function";
}
/**
* The element in question is remaining in the DOM.
* @param el - Element to flip
* @returns
*/
function remain(el) {
	const oldCoords = coords.get(el);
	const newCoords = getCoords(el);
	if (!isEnabled(el)) return coords.set(el, newCoords);
	if (isOffscreen(el)) {
		coords.set(el, newCoords);
		observePosition(el);
		return;
	}
	let animation;
	if (!oldCoords) return;
	const pluginOrOptions = getOptions(el);
	if (typeof pluginOrOptions !== "function") {
		let deltaLeft = oldCoords.left - newCoords.left;
		let deltaTop = oldCoords.top - newCoords.top;
		const deltaRight = oldCoords.left + oldCoords.width - (newCoords.left + newCoords.width);
		if (oldCoords.top + oldCoords.height - (newCoords.top + newCoords.height) == 0) deltaTop = 0;
		if (deltaRight == 0) deltaLeft = 0;
		const [widthFrom, widthTo, heightFrom, heightTo] = getTransitionSizes(el, oldCoords, newCoords);
		const start = { transform: `translate(${deltaLeft}px, ${deltaTop}px)` };
		const end = { transform: `translate(0, 0)` };
		if (widthFrom !== widthTo) {
			start.width = `${widthFrom}px`;
			end.width = `${widthTo}px`;
		}
		if (heightFrom !== heightTo) {
			start.height = `${heightFrom}px`;
			end.height = `${heightTo}px`;
		}
		animation = el.animate([start, end], {
			duration: pluginOrOptions.duration,
			easing: pluginOrOptions.easing
		});
	} else {
		const [keyframes] = getPluginTuple(pluginOrOptions(el, "remain", oldCoords, newCoords));
		animation = new Animation(keyframes);
		animation.play();
	}
	animations.set(el, animation);
	coords.set(el, newCoords);
	animation.addEventListener("finish", updatePos.bind(null, el, false), { once: true });
}
/**
* Adds the element with a transition.
* @param el - Animates the element being added.
*/
function add(el) {
	if (NEW in el) delete el[NEW];
	const newCoords = getCoords(el);
	coords.set(el, newCoords);
	const pluginOrOptions = getOptions(el);
	if (!isEnabled(el)) return;
	if (isOffscreen(el)) {
		observePosition(el);
		return;
	}
	let animation;
	if (typeof pluginOrOptions !== "function") animation = el.animate([
		{
			transform: "scale(.98)",
			opacity: 0
		},
		{
			transform: "scale(0.98)",
			opacity: 0,
			offset: .5
		},
		{
			transform: "scale(1)",
			opacity: 1
		}
	], {
		duration: pluginOrOptions.duration * 1.5,
		easing: "ease-in"
	});
	else {
		const [keyframes] = getPluginTuple(pluginOrOptions(el, "add", newCoords));
		animation = new Animation(keyframes);
		animation.play();
	}
	animations.set(el, animation);
	animation.addEventListener("finish", updatePos.bind(null, el, false), { once: true });
}
/**
* Clean up after removing an element from the dom.
* @param el - Element being removed
* @param styles - Optional styles that should be removed from the element.
*/
function cleanUp(el, styles) {
	var _a;
	el.remove();
	coords.delete(el);
	siblings.delete(el);
	animations.delete(el);
	(_a = intersections.get(el)) === null || _a === void 0 || _a.disconnect();
	setTimeout(() => {
		if (DEL in el) delete el[DEL];
		Object.defineProperty(el, NEW, {
			value: true,
			configurable: true
		});
		if (styles && el instanceof HTMLElement) for (const style in styles) el.style[style] = "";
	}, 0);
}
/**
* Animates the removal of an element.
* @param el - Element to remove
*/
function remove(el) {
	var _a;
	if (!siblings.has(el) || !coords.has(el)) return;
	const [prev, next] = siblings.get(el);
	Object.defineProperty(el, DEL, {
		value: true,
		configurable: true
	});
	const finalX = window.scrollX;
	const finalY = window.scrollY;
	if (next && next.parentNode && next.parentNode instanceof Element) next.parentNode.insertBefore(el, next);
	else if (prev && prev.parentNode) prev.parentNode.appendChild(el);
	else (_a = getTarget(el)) === null || _a === void 0 || _a.appendChild(el);
	if (!isEnabled(el)) return cleanUp(el);
	const [top, left, width, height] = deletePosition(el);
	const optionsOrPlugin = getOptions(el);
	const oldCoords = coords.get(el);
	if (finalX !== scrollX || finalY !== scrollY) adjustScroll(el, finalX, finalY, optionsOrPlugin);
	let animation;
	let styleReset = {
		position: "absolute",
		top: `${top}px`,
		left: `${left}px`,
		width: `${width}px`,
		height: `${height}px`,
		margin: "0",
		pointerEvents: "none",
		transformOrigin: "center",
		zIndex: "100"
	};
	if (!isPlugin(optionsOrPlugin)) {
		Object.assign(el.style, styleReset);
		animation = el.animate([{
			transform: "scale(1)",
			opacity: 1
		}, {
			transform: "scale(.98)",
			opacity: 0
		}], {
			duration: optionsOrPlugin.duration,
			easing: "ease-out"
		});
	} else {
		const [keyframes, options] = getPluginTuple(optionsOrPlugin(el, "remove", oldCoords));
		if ((options === null || options === void 0 ? void 0 : options.styleReset) !== false) {
			styleReset = (options === null || options === void 0 ? void 0 : options.styleReset) || styleReset;
			Object.assign(el.style, styleReset);
		}
		animation = new Animation(keyframes);
		animation.play();
	}
	animations.set(el, animation);
	animation.addEventListener("finish", () => cleanUp(el, styleReset), { once: true });
}
/**
* If the element being removed is at the very bottom of the page, and the
* the page was scrolled into a space being "made available" by the element
* that was removed, the page scroll will have jumped up some amount. We need
* to offset the jump by the amount that the page was "automatically" scrolled
* up. We can do this by comparing the scroll position before and after the
* element was removed, and then offsetting by that amount.
*
* @param el - The element being deleted
* @param finalX - The final X scroll position
* @param finalY - The final Y scroll position
* @param optionsOrPlugin - The options or plugin
* @returns
*/
function adjustScroll(el, finalX, finalY, optionsOrPlugin) {
	const scrollDeltaX = scrollX - finalX;
	const scrollDeltaY = scrollY - finalY;
	const scrollBefore = document.documentElement.style.scrollBehavior;
	if (getComputedStyle(root).scrollBehavior === "smooth") document.documentElement.style.scrollBehavior = "auto";
	window.scrollTo(window.scrollX + scrollDeltaX, window.scrollY + scrollDeltaY);
	if (!el.parentElement) return;
	const parent = el.parentElement;
	let lastHeight = parent.clientHeight;
	let lastWidth = parent.clientWidth;
	const startScroll = performance.now();
	function smoothScroll() {
		requestAnimationFrame(() => {
			if (!isPlugin(optionsOrPlugin)) {
				const deltaY = lastHeight - parent.clientHeight;
				const deltaX = lastWidth - parent.clientWidth;
				if (startScroll + optionsOrPlugin.duration > performance.now()) {
					window.scrollTo({
						left: window.scrollX - deltaX,
						top: window.scrollY - deltaY
					});
					lastHeight = parent.clientHeight;
					lastWidth = parent.clientWidth;
					smoothScroll();
				} else document.documentElement.style.scrollBehavior = scrollBefore;
			}
		});
	}
	smoothScroll();
}
/**
* Determines the position of the element being removed.
* @param el - The element being deleted
* @returns
*/
function deletePosition(el) {
	var _a;
	const oldCoords = coords.get(el);
	const [width, , height] = getTransitionSizes(el, oldCoords, getCoords(el));
	let offsetParent = el.parentElement;
	while (offsetParent && (getComputedStyle(offsetParent).position === "static" || offsetParent instanceof HTMLBodyElement)) offsetParent = offsetParent.parentElement;
	if (!offsetParent) offsetParent = document.body;
	const parentStyles = getComputedStyle(offsetParent);
	const parentCoords = !animations.has(el) || ((_a = animations.get(el)) === null || _a === void 0 ? void 0 : _a.playState) === "finished" ? getCoords(offsetParent) : coords.get(offsetParent);
	return [
		Math.round(oldCoords.top - parentCoords.top) - raw(parentStyles.borderTopWidth),
		Math.round(oldCoords.left - parentCoords.left) - raw(parentStyles.borderLeftWidth),
		width,
		height
	];
}
/**
* A function that automatically adds animation effects to itself and its
* immediate children. Specifically it adds effects for adding, moving, and
* removing DOM elements.
* @param el - A parent element to add animations to.
* @param options - An optional object of options.
*/
function autoAnimate(el, config = {}) {
	if (supportedBrowser && resize) {
		if (!(window.matchMedia("(prefers-reduced-motion: reduce)").matches && !isPlugin(config) && !config.disrespectUserMotionPreference)) {
			enabled.add(el);
			if (getComputedStyle(el).position === "static") Object.assign(el.style, { position: "relative" });
			forEach(el, updatePos, poll, (element) => resize === null || resize === void 0 ? void 0 : resize.observe(element));
			if (isPlugin(config)) options.set(el, config);
			else options.set(el, {
				duration: 250,
				easing: "ease-in-out",
				...config
			});
			const mo = new MutationObserver(handleMutations);
			mo.observe(el, { childList: true });
			mutationObservers.set(el, mo);
			parents.add(el);
		}
	}
	return Object.freeze({
		parent: el,
		enable: () => {
			enabled.add(el);
		},
		disable: () => {
			enabled.delete(el);
			forEach(el, (node) => {
				const a = animations.get(node);
				try {
					a === null || a === void 0 || a.cancel();
				} catch {}
				animations.delete(node);
				const d = debounces.get(node);
				if (d) clearTimeout(d);
				debounces.delete(node);
				const i = intervals.get(node);
				if (i) clearInterval(i);
				intervals.delete(node);
			});
		},
		isEnabled: () => enabled.has(el),
		destroy: () => {
			enabled.delete(el);
			parents.delete(el);
			options.delete(el);
			const mo = mutationObservers.get(el);
			mo === null || mo === void 0 || mo.disconnect();
			mutationObservers.delete(el);
			forEach(el, (node) => {
				resize === null || resize === void 0 || resize.unobserve(node);
				const a = animations.get(node);
				try {
					a === null || a === void 0 || a.cancel();
				} catch {}
				animations.delete(node);
				const io = intersections.get(node);
				io === null || io === void 0 || io.disconnect();
				intersections.delete(node);
				const i = intervals.get(node);
				if (i) clearInterval(i);
				intervals.delete(node);
				const d = debounces.get(node);
				if (d) clearTimeout(d);
				debounces.delete(node);
				coords.delete(node);
				siblings.delete(node);
			});
		}
	});
}
//#endregion
//#region node_modules/@formkit/auto-animate/react/index.mjs
/**
* AutoAnimate hook for adding dead-simple transitions and animations to react.
* @param options - Auto animate options or a plugin
* @returns
*/
function useAutoAnimate(options) {
	const [controller, setController] = (0, import_react.useState)();
	const memoizedOptions = (0, import_react.useMemo)(() => options, []);
	const element = (0, import_react.useCallback)((node) => {
		if (node instanceof HTMLElement) setController(autoAnimate(node, memoizedOptions));
		else setController(void 0);
	}, [memoizedOptions]);
	const setEnabled = (0, import_react.useCallback)((enabled) => {
		if (controller) enabled ? controller.enable() : controller.disable();
	}, [controller]);
	(0, import_react.useEffect)(() => {
		return () => {
			var _a;
			(_a = controller === null || controller === void 0 ? void 0 : controller.destroy) === null || _a === void 0 || _a.call(controller);
		};
	}, [controller]);
	return [element, setEnabled];
}
//#endregion
export { require_react as n, useAutoAnimate as t };
