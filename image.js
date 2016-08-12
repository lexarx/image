var View = require('views/view');
var Event = require('event');

var Image = View.extend({
	tag: 'img',

	/**
	 * @constructor
	 * @param {Image.Image.Parameters} parameters
	 */
	constructor: function(parameters) {
		this.loading = new Event();
		this.loaded = new Event();
		this.failed = new Event();
		this.state = Image.State.UNLOADED;
		this.super(parameters);
		if (parameters !== undefined && parameters.url !== undefined) {
			this.setUrl(parameters.url);
		}
		if (parameters !== undefined && parameters.width !== undefined) {
			this.setWidth(parameters.width);
		}
		if (parameters !== undefined && parameters.height !== undefined) {
			this.setHeight(parameters.height);
		}
	},

	/**
	 * @protected
	 * @override
	 */
	render: function() {
		this.element.addEventListener('load', this.onLoad.bind(this));
		this.element.addEventListener('error', this.onError.bind(this));
	},

	/**
	 * @param {String} url
	 */
	setUrl: function(url) {
		this.state = Image.State.LOADING;
		this.loading.trigger(this);
		this.url = url;
		this.element.src = url === undefined || url === null ? '' : url;
	},

	/**
	 * @returns {String}
	 */
	getUrl: function() {
		return this.url;
	},

	/**
	 * @protected
	 */
	onLoad: function() {
		this.state = Image.State.LOADED;
		this.loaded.trigger(this);
	},

	/**
	 * @protected
	 */
	onError: function() {
		this.state = Image.State.FAILED;
		this.failed.trigger(this);
	},

	/**
	 * @returns {Boolean}
	 */
	isUnloaded: function() {
		return this.state === Image.State.UNLOADED;
	},

	/**
	 * @returns {Boolean}
	 */
	isLoading: function() {
		return this.state === Image.State.LOADING;
	},

	/**
	 * @returns {Boolean}
	 */
	isLoaded: function() {
		return this.state === Image.State.LOADED;
	},

	/**
	 * @returns {Boolean}
	 */
	isFailed: function() {
		return this.state === Image.State.FAILED;
	},

	/**
	 * @returns {Number}
	 */
	getNaturalWidth: function() {
		return this.element.naturalWidth;
	},

	/**
	 * @returns {Number}
	 */
	getNaturalHeight: function() {
		return this.element.naturalHeight;
	},

	/**
	 * @param {Number} width
	 */
	setWidth: function(width) {
		this.element.width = width;
	},

	/**
	 * @returns {Number}
	 */
	getWidth: function() {
		return this.element.width;
	},

	/**
	 * @param {Number} height
	 */
	setHeight: function(height) {
		this.element.height = height;
	},

	/**
	 * @returns {Number}
	 */
	getHeight: function() {
		return this.element.height;
	},

	/**
	 * @returns {Image.State}
	 */
	getState: function() {
		return this.state;
	}
}, {
	State: {
		UNLOADED: 0,
		LOADING: 1,
		LOADED: 2,
		FAILED: 3
	}
});

module.exports = Image;

/**
 * @typedef Parameters
 * @namespace Image.Image
 * @extends Views.View.Parameters
 * @property {String} url
 * @property {Number} width
 * @property {Number} height
 */