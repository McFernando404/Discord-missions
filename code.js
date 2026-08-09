// ═══════════════════════════════════════════════════════════════
// QUEST COMPLETER v3.1 - Discord Quest Automation
// ═══════════════════════════════════════════════════════════════
//
// Developed by: ꜰᴇʀɴᴀɴᴅᴏᴏ | ᴅᴇᴠ
//
// LICENSE:
// This code is free to use, modify and share.
// If you fork, modify or redistribute this code,
// you MUST keep the original credits to ꜰᴇʀɴᴀɴᴅᴏᴏ | ᴅᴇᴠ.
// Removing or altering credits is NOT permitted.
//
// ═══════════════════════════════════════════════════════════════

(function () {
	'use strict';

//   █████▒▓█████  ██▀███   ███▄    █  ▄▄▄       ███▄    █ ▓█████▄  ▒█████   ▒█████        ▓█████▄ ▓█████ ██▒   █▓
// ▓██   ▒ ▓█   ▀ ▓██ ▒ ██▒ ██ ▀█   █ ▒████▄     ██ ▀█   █ ▒██▀ ██▌▒██▒  ██▒▒██▒  ██▒      ▒██▀ ██▌▓█   ▀▓██░   █▒
// ▒████ ░ ▒███   ▓██ ░▄█ ▒▓██  ▀█ ██▒▒██  ▀█▄  ▓██  ▀█ ██▒░██   █▌▒██░  ██▒▒██░  ██▒      ░██   █▌▒███   ▓██  █▒░
// ░▓█▒  ░ ▒▓█  ▄ ▒██▀▀█▄  ▓██▒  ▐▌██▒░██▄▄▄▄██ ▓██▒  ▐▌██▒░▓█▄   ▌▒██   ██░▒██   ██░      ░▓█▄   ▌▒▓█  ▄  ▒██ █░░
// ░▒█░    ░▒████▒░██▓ ▒██▒▒██░   ▓██░ ▓█   ▓██▒▒██░   ▓██░░▒████▓ ░ ████▓▒░░ ████▓▒░      ░▒████▓ ░▒████▒  ▒▀█░  
//  ▒ ░    ░░ ▒░ ░░ ▒▓ ░▒▓░░ ▒░   ▒ ▒  ▒▒   ▓▒█░░ ▒░   ▒ ▒  ▒▒▓  ▒ ░ ▒░▒░▒░ ░ ▒░▒░▒░        ▒▒▓  ▒ ░░ ▒░ ░  ░ ▐░  
//  ░       ░ ░  ░  ░▒ ░ ▒░░ ░░   ░ ▒░  ▒   ▒▒ ░░ ░░   ░ ▒░ ░ ▒  ▒   ░ ▒ ▒░   ░ ▒ ▒░        ░ ▒  ▒  ░ ░  ░  ░ ░░  
//  ░ ░       ░     ░░   ░    ░   ░ ░   ░   ▒      ░   ░ ░  ░ ░  ░ ░ ░ ░ ▒  ░ ░ ░ ▒         ░ ░  ░    ░       ░░  
//            ░  ░   ░              ░       ░  ░         ░    ░        ░ ░      ░ ░           ░       ░  ░     ░  
//                                                          ░                               ░                 ░   

	const Logger = {
		enabled: false, // Silenced: all progress goes to visual panel

		colors: {
			reset: '\x1b[0m',
			bright: '\x1b[1m',
			gray: '\x1b[90m',
			green: '\x1b[32m',
			yellow: '\x1b[33m',
			blue: '\x1b[34m',
			red: '\x1b[31m',
			cyan: '\x1b[36m',
		},

		clear() { },
		separator() { },

		log(message, category = 'default') {
			if (!this.enabled) return;
			console.log(message);
		},

		formatTime(seconds) {
			if (seconds < 60) return `${seconds}s`;
			if (seconds < 3600) return `${Math.round(seconds / 60 * 10) / 10}min`;
			return `${Math.floor(seconds / 3600)}h ${Math.round((seconds % 3600) / 60)}min`;
		},

		init() {
			this.clear();
			this.log('╔══════════════════════════════════════════════════════════════╗', 'gray');
			this.log('║  🟡 QUEST COMPLETER v3.1 - Improved Anti-Detection           ║', 'info');
			this.log('╚══════════════════════════════════════════════════════════════╝', 'gray');
		},
	};

	// ═══════════════════════════════════════════════════════════════
	// 🎨 VISUAL INDICATOR (On-screen UI, not console)
	// ═══════════════════════════════════════════════════════════════

	const VisualIndicator = {
		styleEl: null,
		panelEl: null,

		// Clean up previous instances
		cleanup() {
			document.querySelectorAll('.quest-panel, #quest-indicator-style').forEach(el => el.remove());
			document.querySelectorAll('[class*="quest-active"]').forEach(el => el.classList.remove('quest-active'));
		},

		init(quests) {
			this.cleanup();

			this.styleEl = document.createElement('style');
			this.styleEl.id = 'quest-indicator-style';
			this.styleEl.textContent = `
				@keyframes questSlideIn {
					from { transform: translateX(120%); opacity: 0; }
					to { transform: translateX(0); opacity: 1; }
				}
				@keyframes questSlideOut {
					from { transform: translateX(0); opacity: 1; }
					to { transform: translateX(120%); opacity: 0; }
				}
				@keyframes questSpin {
					from { transform: rotate(0deg); }
					to { transform: rotate(360deg); }
				}
				@keyframes questGlow {
					0%, 100% { border-color: #faa61a; box-shadow: inset 0 0 0 2px #faa61a; }
					50% { border-color: #ffd75e; box-shadow: inset 0 0 0 2px #ffd75e, inset 0 0 40px -10px #faa61a; }
				}
				@keyframes questGlowGreen {
					0%, 100% { border-color: #43b581; box-shadow: inset 0 0 0 2px #43b581; }
					50% { border-color: #3ba55c; box-shadow: inset 0 0 0 2px #3ba55c, inset 0 0 40px -10px #43b581; }
				}
				@keyframes questGlowRed {
					0%, 100% { border-color: #f04747; box-shadow: inset 0 0 0 2px #f04747; }
					50% { border-color: #ff5c5c; box-shadow: inset 0 0 0 2px #ff5c5c, inset 0 0 40px -10px #f04747; }
				}
				/* Discord window borders */
				.quest-active-overlay,
				.quest-active-overlay [class*="base_"],
				.quest-active-overlay [class*="app_"] {
					animation: questGlow 3s ease-in-out infinite !important;
				}
				.quest-done-overlay,
				.quest-done-overlay [class*="base_"],
				.quest-done-overlay [class*="app_"] {
					animation: questGlowGreen 3s ease-in-out infinite !important;
				}
				.quest-error-overlay,
				.quest-error-overlay [class*="base_"],
				.quest-error-overlay [class*="app_"] {
					animation: questGlowRed 3s ease-in-out infinite !important;
				}
				/* Window title buttons (minimize, maximize, close) */
				.quest-active-overlay [class*="winButton_"],
				.quest-done-overlay [class*="winButton_"],
				.quest-error-overlay [class*="winButton_"] {
					filter: brightness(1.3) saturate(1.5);
					transition: filter 0.3s;
				}
				.quest-active-overlay [class*="wordmark_"],
				.quest-done-overlay [class*="wordmark_"],
				.quest-error-overlay [class*="wordmark_"] {
					filter: drop-shadow(0 0 4px #faa61a);
				}
				.quest-panel {
					position: fixed;
					bottom: 20px;
					right: 20px;
					z-index: 999999;
					width: 320px;
					max-height: 70vh;
					overflow-y: auto;
					background: #1e1f22;
					border: 2px solid #faa61a;
					border-radius: 12px;
					padding: 0;
					color: #fff;
					font-family: 'gg sans', 'Noto Sans', Helvetica, Arial, sans-serif;
					font-size: 13px;
					box-shadow: 0 8px 32px rgba(0,0,0,0.6);
					animation: questSlideIn 0.4s cubic-bezier(0.2, 0.9, 0.3, 1.2);
					user-select: none;
				}
				.quest-panel.hide {
					animation: questSlideOut 0.4s ease-in forwards;
				}
				.quest-panel-header {
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 12px 14px;
					border-bottom: 1px solid rgba(255,255,255,0.08);
					font-weight: 700;
					font-size: 14px;
				}
				.quest-panel-header-icon {
					width: 16px;
					height: 16px;
					border: 2px solid rgba(255,255,255,0.2);
					border-top-color: #faa61a;
					border-radius: 50%;
					animation: questSpin 0.8s linear infinite;
					flex-shrink: 0;
				}
				.quest-panel-header-icon.done {
					border: none;
					animation: none;
					font-size: 16px;
					line-height: 16px;
				}
				.quest-panel-header-left {
					display: flex;
					align-items: center;
					gap: 8px;
				}
				.quest-panel-header-counter {
					font-size: 11px;
					font-weight: 400;
					opacity: 0.6;
				}
				.quest-panel-list {
					padding: 6px 8px;
					display: flex;
					flex-direction: column;
					gap: 4px;
				}
				.quest-item {
					display: flex;
					align-items: center;
					gap: 8px;
					padding: 8px 10px;
					border-radius: 8px;
					background: rgba(255,255,255,0.03);
					transition: background 0.2s;
				}
				.quest-item.active {
					background: rgba(250, 166, 26, 0.12);
					border-left: 3px solid #faa61a;
				}
				.quest-item.done { opacity: 0.7; }
				.quest-item.failed { opacity: 0.6; }
				.quest-item.manual { opacity: 0.5; }
				.quest-item.manual .quest-item-name {
					text-decoration: line-through;
					text-decoration-color: #f04747;
					text-decoration-thickness: 2px;
				}
				.quest-item.manual .quest-item-detail {
					color: #f04747;
					opacity: 0.8;
				}
				.quest-item-icon {
					width: 18px;
					height: 18px;
					flex-shrink: 0;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 14px;
				}
				.quest-item-spinner {
					width: 14px;
					height: 14px;
					border: 2px solid rgba(255,255,255,0.15);
					border-top-color: #faa61a;
					border-radius: 50%;
					animation: questSpin 0.8s linear infinite;
				}
				.quest-item-info { flex: 1; min-width: 0; }
				.quest-item-name {
					font-size: 12px;
					font-weight: 600;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
				.quest-item-detail { font-size: 10px; opacity: 0.6; margin-top: 1px; }
				.quest-item-bar {
					width: 100%;
					height: 3px;
					background: rgba(255,255,255,0.08);
					border-radius: 2px;
					margin-top: 4px;
					overflow: hidden;
				}
				.quest-item-bar-fill {
					height: 100%;
					border-radius: 2px;
					transition: width 0.5s ease;
				}
				@keyframes questCreditsGradient {
					0% { background-position: 0% 50%; }
					50% { background-position: 100% 50%; }
					100% { background-position: 0% 50%; }
				}
				@keyframes questCreditsShine {
					0%, 100% { text-shadow: 0 0 3px rgba(250,166,26,0.3); }
					50% { text-shadow: 0 0 8px rgba(250,166,26,0.5), 0 0 14px rgba(255,215,94,0.3); }
				}
				.quest-credits {
					font-size: 10px;
					font-weight: 400;
					text-align: center;
					padding: 6px 0 2px;
					color: #ccc;
					letter-spacing: 1px;
				}
				.quest-credits-nick {
					font-weight: 700;
					background: linear-gradient(90deg, #faa61a, #ff73fa, #00b0f4, #43b581, #faa61a);
					background-size: 300% 100%;
					-webkit-background-clip: text;
					background-clip: text;
					-webkit-text-fill-color: transparent;
					animation: questCreditsGradient 4s linear infinite, questCreditsShine 2s ease-in-out infinite;
				}
				.quest-eject-btn {
					margin: 8px 12px 10px;
					padding: 8px;
					background: linear-gradient(135deg, #f04747, #a83232);
					border: none;
					border-radius: 8px;
					color: #fff;
					font-size: 12px;
					font-weight: 700;
					cursor: pointer;
					display: flex;
					align-items: center;
					justify-content: center;
					gap: 6px;
					transition: all 0.2s;
					font-family: inherit;
				}
				.quest-eject-btn:hover {
					background: linear-gradient(135deg, #ff5c5c, #c0392b);
					box-shadow: 0 0 16px rgba(240,71,71,0.5);
					transform: scale(1.03);
				}
				.quest-eject-btn:active { transform: scale(0.97); }
			`;
			document.head.appendChild(this.styleEl);

			// Create panel
			this.panelEl = document.createElement('div');
			this.panelEl.className = 'quest-panel';

			let listHtml = '';
			quests.forEach((q, i) => {
				const info = getQuestInfo(q);
				const pct = Math.floor(info.secondsDone / info.secondsNeeded * 100);
				listHtml += `
					<div class="quest-item" data-quest-index="${i}">
						<div class="quest-item-icon">⏳</div>
						<div class="quest-item-info">
							<div class="quest-item-name">${info.questName}</div>
							<div class="quest-item-detail">${info.taskName} - ${pct}%</div>
							<div class="quest-item-bar"><div class="quest-item-bar-fill" style="width: ${pct}%; background: #80848e;"></div></div>
						</div>
					</div>
				`;
			});

			this.panelEl.innerHTML = `
				<div class="quest-panel-header">
					<div class="quest-panel-header-left">
						<div class="quest-panel-header-icon"></div>
						<span>Quest Completer</span>
					</div>
					<div class="quest-panel-header-right">
						<span class="quest-panel-header-counter">0/${quests.length}</span>
						<span class="quest-panel-close" title="Close">✕</span>
					</div>
				</div>
				<div class="quest-panel-list">${listHtml}</div>
				<div class="quest-credits">Developed by <span class="quest-credits-nick">ꜰᴇʀɴᴀɴᴅᴏᴏ | ᴅᴇᴠ</span></div>
				<button class="quest-eject-btn" title="Stop all processes completely">💉 Eject</button>
			`;
			document.body.appendChild(this.panelEl);
			this.counter = this.panelEl.querySelector('.quest-panel-header-counter');
			this.headerIcon = this.panelEl.querySelector('.quest-panel-header-icon');

			// Close button
			const closeBtn = this.panelEl.querySelector('.quest-panel-close');
			closeBtn.style.cursor = 'pointer';
			closeBtn.style.marginLeft = '8px';
			closeBtn.style.opacity = '0.6';
			closeBtn.style.fontSize = '14px';
			closeBtn.addEventListener('click', () => this.destroy());

			// Eject button
			const ejectBtn = this.panelEl.querySelector('.quest-eject-btn');
			ejectBtn.addEventListener('click', () => this.eject());

			// Make panel draggable
			this.makeDraggable();
		},

		makeDraggable() {
			const header = this.panelEl.querySelector('.quest-panel-header');
			let isDragging = false;
			let offsetX = 0;
			let offsetY = 0;

			header.style.cursor = 'grab';

			header.addEventListener('mousedown', (e) => {
				if (e.target.classList.contains('quest-panel-close')) return;
				isDragging = true;
				header.style.cursor = 'grabbing';
				const rect = this.panelEl.getBoundingClientRect();
				offsetX = e.clientX - rect.left;
				offsetY = e.clientY - rect.top;
				e.preventDefault();
			});

			document.addEventListener('mousemove', (e) => {
				if (!isDragging) return;
				let x = e.clientX - offsetX;
				let y = e.clientY - offsetY;

				// Keep within screen bounds
				const maxX = window.innerWidth - this.panelEl.offsetWidth;
				const maxY = window.innerHeight - this.panelEl.offsetHeight;
				x = Math.max(0, Math.min(x, maxX));
				y = Math.max(0, Math.min(y, maxY));

				this.panelEl.style.left = `${x}px`;
				this.panelEl.style.top = `${y}px`;
				this.panelEl.style.right = 'auto';
				this.panelEl.style.bottom = 'auto';
			});

			document.addEventListener('mouseup', () => {
				if (isDragging) {
					isDragging = false;
					header.style.cursor = 'grab';
				}
			});
		},

		setQuestActive(index, questName) {
			const item = this.panelEl?.querySelector(`[data-quest-index="${index}"]`);
			if (!item) return;

			// Remove active from previous
			this.panelEl.querySelectorAll('.quest-item.active').forEach(el => el.classList.remove('active'));
			item.classList.add('active');

			const icon = item.querySelector('.quest-item-icon');
			icon.innerHTML = '<div class="quest-item-spinner"></div>';

			// Apply yellow border to Discord
			this.applyOverlay('quest-active-overlay');
		},

		applyOverlay(className) {
			const targets = document.querySelectorAll('[class*="base_"], [class*="app_"], [class*="appMount_"]');
			targets.forEach(el => {
				el.classList.remove('quest-active-overlay', 'quest-done-overlay', 'quest-error-overlay');
				el.classList.add(className);
			});
		},

		clearOverlay() {
			document.querySelectorAll('[class*="base_"], [class*="app_"], [class*="appMount_"]').forEach(el => {
				el.classList.remove('quest-active-overlay', 'quest-done-overlay', 'quest-error-overlay');
			});
		},

		setQuestProgress(index, percent, detail) {
			const item = this.panelEl?.querySelector(`[data-quest-index="${index}"]`);
			if (!item) return;

			const fill = item.querySelector('.quest-item-bar-fill');
			const detailEl = item.querySelector('.quest-item-detail');

			if (fill) {
				fill.style.width = `${Math.min(100, percent)}%`;
				fill.style.background = '#faa61a';
			}
			if (detailEl && detail) detailEl.textContent = detail;
		},

		setQuestDone(index, success) {
			const item = this.panelEl?.querySelector(`[data-quest-index="${index}"]`);
			if (!item) return;

			item.classList.remove('active');
			item.classList.add(success ? 'done' : 'failed');

			const icon = item.querySelector('.quest-item-icon');
			icon.innerHTML = success ? '✅' : '❌';

			const fill = item.querySelector('.quest-item-bar-fill');
			if (fill) fill.style.background = success ? '#43b581' : '#f04747';
		},

		setQuestManual(index, taskName) {
			const item = this.panelEl?.querySelector(`[data-quest-index="${index}"]`);
			if (!item) return;

			item.classList.add('manual');
			const icon = item.querySelector('.quest-item-icon');
			icon.innerHTML = '🔒';
			const detail = item.querySelector('.quest-item-detail');
			if (detail) detail.textContent = `${taskName} - Manual`;
			const fill = item.querySelector('.quest-item-bar-fill');
			if (fill) fill.style.background = '#80848e';
		},

		updateCounter(done, total) {
			if (this.counter) this.counter.textContent = `${done}/${total}`;
		},

		setGlobalDone(allSuccess) {
			if (this.headerIcon) {
				this.headerIcon.classList.add('done');
				this.headerIcon.innerHTML = allSuccess ? '✅' : '⚠️';
			}
			// Change border to green (success) or red (partial)
			this.applyOverlay(allSuccess ? 'quest-done-overlay' : 'quest-error-overlay');
		},

		error(message) {
			if (this.headerIcon) {
				this.headerIcon.classList.add('done');
				this.headerIcon.innerHTML = '❌';
			}
			this.applyOverlay('quest-error-overlay');
		},

		destroy() {
			this.clearOverlay();
			if (this.panelEl) {
				this.panelEl.classList.add('hide');
				setTimeout(() => {
					this.panelEl?.remove();
					this.styleEl?.remove();
				}, 500);
			}
		},

		eject() {
			// Global signal to stop all loops
			window.__questEjected = true;

			// Restore stores if modified
			this.clearOverlay();

			// Remove everything from DOM
			this.panelEl?.remove();
			this.styleEl?.remove();
			this.panelEl = null;
			this.styleEl = null;

			// DiscordNative restoration (RunningGameStore etc)
			// is already handled in each individual function
		},
	};

	// ═══════════════════════════════════════════════════════════════
	// ⚙️ CONFIGURATION - Random values for anti-detection
	// ═══════════════════════════════════════════════════════════════

	const CONFIG = {
		VIDEO: {
			speedMin: 8,            // Progress seconds per call (min)
			speedMax: 12,           // Progress seconds per call (max)
			intervalMin: 3,         // Min wait between calls (seconds)
			intervalMax: 5,         // Max wait between calls (random = more human)
		},
		ACTIVITY: {
			heartbeatMin: 18,       // Seconds between heartbeats (min)
			heartbeatMax: 22,       // Seconds between heartbeats (max)
			maxAttempts: 60,        // Max attempts before giving up
		},
		GENERAL: {
			initialDelayMin: 1000,  // Delay before starting (ms)
			initialDelayMax: 3000,
			betweenQuestsMin: 2000, // Pause between quests (ms)
			betweenQuestsMax: 4000,
			rateLimitBuffer: 1.5,   // Multiplier for 429 retry_after
			maxConsecutiveErrors: 5,// Consecutive errors before abort
		}
	};

	const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
	const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
	const getRandom = (min, max) => Math.random() * (max - min) + min;

	// ═══════════════════════════════════════════════════════════════
	// 🛡️ SAFE API - Handles rate limits and errors
	// ═══════════════════════════════════════════════════════════════

	const safeApiCall = async (fn, operation = 'api') => {
		let consecutiveErrors = 0;

		while (consecutiveErrors < CONFIG.GENERAL.maxConsecutiveErrors) {
			try {
				return await fn();
			} catch (error) {
				consecutiveErrors++;

				// Rate limit (429)
				if (error.status === 429) {
					const retryAfter = error.body?.retry_after
						? error.body.retry_after * 1000 * CONFIG.GENERAL.rateLimitBuffer
						: getRandomInt(3000, 5000);

					Logger.log(`⚠️ Rate limit on ${operation}. Waiting ${Math.ceil(retryAfter / 1000)}s...`, 'warning');
					await delay(retryAfter);
					continue;
				}

				// Error 400/404 - Do not retry
				if (error.status === 400 || error.status === 404) {
					throw error;
				}

				// Error 5xx - Retry with backoff
				if (error.status >= 500) {
					const backoff = Math.min(1000 * Math.pow(2, consecutiveErrors), 30000);
					Logger.log(`⚠️ Error ${error.status} on ${operation}. Retrying in ${backoff / 1000}s...`, 'warning');
					await delay(backoff);
					continue;
				}

				// Network or other error
				if (consecutiveErrors < CONFIG.GENERAL.maxConsecutiveErrors) {
					await delay(getRandomInt(2000, 4000));
					continue;
				}

				throw error;
			}
		}

		throw new Error(`Too many consecutive errors on ${operation}`);
	};

	// ═══════════════════════════════════════════════════════════════
	// 🎮 WEBPACK LOADER - With fallback for Stable and Canary
	// ═══════════════════════════════════════════════════════════════

	Logger.init();
	Logger.log('🔧 Initializing webpack...', 'info');

	delete window.$;

	let wpRequire;
	try {
		// Method 1: Standard (Canary)
		wpRequire = webpackChunkdiscord_app.push([[Symbol()], {}, r => r]);
		webpackChunkdiscord_app.pop();
	} catch (e1) {
		Logger.log('⚠️ Method 1 failed, trying alternative...', 'warning');
		try {
			// Method 2: Alternative (modified Stable)
			window.webpackChunkdiscord_app.push([[Math.random()], {}, (req) => { wpRequire = req; }]);
		} catch (e2) {
			Logger.log('❌ Could not initialize webpack: ' + e2.message, 'error');
			Logger.log('💡 Use Discord Canary: https://canary.discord.com/download', 'warning');
			return;
		}
	}

	if (!wpRequire || !wpRequire.c) {
		Logger.log('❌ wpRequire.c not available. Use Discord Canary.', 'error');
		return;
	}

	Logger.log('✅ Webpack loaded', 'success');

	// ═══════════════════════════════════════════════════════════════
	// 🔧 MODULE FINDER - Updated selectors with fallback
	// ═══════════════════════════════════════════════════════════════

	const allModules = Object.values(wpRequire.c);

	const findModule = (checkFn, exportKeys) => {
		for (const mod of allModules) {
			const exp = mod?.exports;
			if (!exp) continue;
			for (const key of exportKeys) {
				try {
					if (checkFn(exp[key])) return exp[key];
				} catch (e) { }
			}
		}
		return null;
	};

	const ApplicationStreamingStore = findModule(
		(x) => x?.__proto__?.getStreamerActiveStreamMetadata, ['A', 'Z']
	);
	const RunningGameStore = findModule(
		(x) => x?.getRunningGames, ['Ay', 'ZP']
	);
	const QuestsStore = findModule(
		(x) => x?.__proto__?.getQuest, ['A', 'Z']
	);
	const ChannelStore = findModule(
		(x) => x?.__proto__?.getAllThreadsForParent, ['A', 'Z']
	);
	const GuildChannelStore = findModule(
		(x) => x?.getSFWDefaultChannel, ['Ay', 'ZP']
	);
	const FluxDispatcher = findModule(
		(x) => x?.__proto__?.flushWaitQueue, ['h', 'Z']
	);
	const api = findModule(
		(x) => x?.get && typeof x?.post === 'function', ['Bo', 'tn']
	);

	// Validate modules
	const moduleStatus = {
		QuestsStore: !!QuestsStore,
		api: !!api,
		FluxDispatcher: !!FluxDispatcher,
		RunningGameStore: !!RunningGameStore,
		ApplicationStreamingStore: !!ApplicationStreamingStore,
		ChannelStore: !!ChannelStore,
		GuildChannelStore: !!GuildChannelStore,
	};

	const requiredModules = ['QuestsStore', 'api', 'FluxDispatcher'];
	const missingCritical = requiredModules.filter(m => !moduleStatus[m]);
	const failedOptional = Object.entries(moduleStatus)
		.filter(([name, found]) => !found && !requiredModules.includes(name))
		.map(([name]) => name);

	if (failedOptional.length > 0 || missingCritical.length > 0) {
		Object.entries(moduleStatus).forEach(([name, found]) => {
			if (!found) Logger.log(`❌ ${name}`, 'error');
		});
		Logger.log('💡 Use Discord Canary: https://canary.discord.com/download', 'warning');
	}
	if (missingCritical.length > 0) return;

	const names = Object.keys(moduleStatus);
	Logger.log(`✅ Modules: ${names.join(' · ')}`, 'success');

	// ═══════════════════════════════════════════════════════════════
	// 🎯 HELPERS
	// ═══════════════════════════════════════════════════════════════

	const supportedTasks = ["WATCH_VIDEO", "PLAY_ON_DESKTOP", "STREAM_ON_DESKTOP", "PLAY_ACTIVITY", "WATCH_VIDEO_ON_MOBILE"];
	const isApp = typeof DiscordNative !== "undefined";

	// Extract quest info (DRY)
	const getQuestInfo = (quest) => {
		const taskConfig = quest.config.taskConfig ?? quest.config.taskConfigV2;
		const taskName = supportedTasks.find(x => taskConfig.tasks[x] != null);
		const taskData = taskConfig.tasks[taskName];
		return {
			questName: quest.config.messages?.questName ?? 'Unknown',
			taskName,
			taskConfig,
			taskData,
			applicationId: quest.config.application?.id ?? taskData?.applications?.[0]?.id,
			applicationName: quest.config.application?.name ?? 'Unknown',
			secondsNeeded: taskData?.target ?? 0,
			secondsDone: quest.userStatus?.progress?.[taskName]?.value ?? 0,
		};
	};

	// Check if quest expired
	const isExpired = (quest) => {
		return quest?.config?.expiresAt && new Date(quest.config.expiresAt).getTime() < Date.now();
	};

	// ═══════════════════════════════════════════════════════════════
	// 🎯 QUEST FUNCTIONS BY TYPE
	// ═══════════════════════════════════════════════════════════════

	const completeVideoQuest = async (quest, info, onProgress) => {
		const { questName, applicationName, secondsNeeded, secondsDone: initial } = info;
		let secondsDone = initial;

		Logger.log(`🎬 Spoofing video: ${applicationName}`, 'info');
		Logger.log(`   Wait ~${Math.ceil((secondsNeeded - secondsDone) / 10 * 4)}s`, 'gray');

		let completed = false;
		let consecutiveErrors = 0;

		while (secondsDone < secondsNeeded) {
			if (window.__questEjected) return false;
			if (isExpired(quest)) {
				Logger.log('⚠️ Quest expired during process', 'warning');
				return false;
			}

			// Random speed per call (more human)
			const speed = getRandomInt(CONFIG.VIDEO.speedMin, CONFIG.VIDEO.speedMax);
			const timestamp = secondsDone + speed;

			try {
				const res = await safeApiCall(() =>
					api.post({
						url: `/quests/${quest.id}/video-progress`,
						body: { timestamp: Math.min(secondsNeeded, timestamp + getRandom(0, 1)) }
					}), 'video-progress'
				);
				completed = res.body?.completed_at != null;
				consecutiveErrors = 0;
			} catch (ex) {
				consecutiveErrors++;
				if (ex.status === 400 || ex.status === 404) return false;
				if (consecutiveErrors >= CONFIG.GENERAL.maxConsecutiveErrors) {
					Logger.log(`❌ Too many errors in video`, 'error');
					return false;
				}
			}

			secondsDone = Math.min(secondsNeeded, timestamp);
			const pct = Math.floor((secondsDone / secondsNeeded) * 100);
			Logger.log(`   Progress: ${pct}% (${Math.floor(secondsDone)}/${secondsNeeded}s)`, 'progress');
			if (onProgress) onProgress(pct, `${info.taskName} - ${pct}%`);

			// Random delay
			await delay(getRandomInt(CONFIG.VIDEO.intervalMin, CONFIG.VIDEO.intervalMax) * 1000);
		}

		// Finalization
		if (!completed) {
			try {
				await safeApiCall(() =>
					api.post({
						url: `/quests/${quest.id}/video-progress`,
						body: { timestamp: secondsNeeded }
					}), 'video-final'
				);
			} catch (e) { }
		}

		return true;
	};

	const completeGameQuest = (quest, info, onProgress) => {
		const { applicationId, applicationName, secondsNeeded, secondsDone } = info;

		return new Promise((resolve) => {
			if (!isApp) {
				Logger.log('❌ Desktop app required', 'error');
				return resolve(false);
			}

			Logger.log(`🎮 Spoofing game: ${applicationName}`, 'info');
			Logger.log(`   Wait ~${Math.ceil((secondsNeeded - secondsDone) / 60)} min`, 'gray');

			api.get({ url: `/applications/public?application_ids=${applicationId}` }).then(res => {
				const appData = res.body[0];
				const exeName = appData.executables?.find(x => x.os === "win32")?.name?.replace(">", "")
					?? appData.name.replace(/[\/\\:*?"<>|]/g, "");

				const pid = Math.floor(Math.random() * 30000) + 1000;

				const fakeGame = {
					cmdLine: `C:\\Program Files\\${appData.name}\\${exeName}`,
					exeName,
					exePath: `c:/program files/${appData.name.toLowerCase()}/${exeName}`,
					hidden: false,
					isLauncher: false,
					id: applicationId,
					name: appData.name,
					pid,
					pidPath: [pid],
					processName: appData.name,
					start: Date.now(),
				};

				const realGames = RunningGameStore.getRunningGames();
				const realGetRunningGames = RunningGameStore.getRunningGames;
				const realGetGameForPID = RunningGameStore.getGameForPID;

				RunningGameStore.getRunningGames = () => [fakeGame, ...realGames];
				RunningGameStore.getGameForPID = (p) => p === pid ? fakeGame : realGetGameForPID?.(p);
				FluxDispatcher.dispatch({
					type: "RUNNING_GAMES_CHANGE",
					removed: [],
					added: [fakeGame],
					games: [fakeGame, ...realGames]
				});

				const handler = data => {
					let progress;
					try {
						progress = quest.config.configVersion === 1
							? data.userStatus.streamProgressSeconds
							: Math.floor(data.userStatus.progress.PLAY_ON_DESKTOP.value);
					} catch (e) { return; }

					Logger.log(`   Progress: ${progress}/${secondsNeeded}s`, 'progress');
					if (onProgress) onProgress(Math.floor(progress / secondsNeeded * 100), `${info.taskName} - ${Math.floor(progress / secondsNeeded * 100)}%`);

					if (progress >= secondsNeeded || isExpired(quest)) {
						// Restore
						RunningGameStore.getRunningGames = realGetRunningGames;
						if (realGetGameForPID) RunningGameStore.getGameForPID = realGetGameForPID;
						FluxDispatcher.dispatch({
							type: "RUNNING_GAMES_CHANGE",
							removed: [fakeGame],
							added: [],
							games: realGames
						});
						FluxDispatcher.unsubscribe("QUESTS_SEND_HEARTBEAT_SUCCESS", handler);
						resolve(progress >= secondsNeeded);
					}
				};

				FluxDispatcher.subscribe("QUESTS_SEND_HEARTBEAT_SUCCESS", handler);
			}).catch(err => {
				Logger.log('❌ Error getting app data: ' + err.message, 'error');
				resolve(false);
			});
		});
	};

	const completeStreamQuest = (quest, info, onProgress) => {
		const { applicationId, applicationName, secondsNeeded, secondsDone } = info;

		return new Promise((resolve) => {
			if (!isApp) {
				Logger.log('❌ Desktop app required', 'error');
				return resolve(false);
			}

			Logger.log(`📺 Spoofing stream: ${applicationName}`, 'info');
			Logger.log(`   ⚠️ Need 1+ person in VC and be streaming`, 'warning');

			const pid = Math.floor(Math.random() * 30000) + 1000;
			const realFunc = ApplicationStreamingStore.getStreamerActiveStreamMetadata;

			ApplicationStreamingStore.getStreamerActiveStreamMetadata = () => ({
				id: applicationId,
				pid,
				sourceName: null
			});

			const handler = data => {
				let progress;
				try {
					progress = quest.config.configVersion === 1
						? data.userStatus.streamProgressSeconds
						: Math.floor(data.userStatus.progress.STREAM_ON_DESKTOP.value);
				} catch (e) { return; }

				Logger.log(`   Progress: ${progress}/${secondsNeeded}s`, 'progress');
				if (onProgress) onProgress(Math.floor(progress / secondsNeeded * 100), `${info.taskName} - ${Math.floor(progress / secondsNeeded * 100)}%`);

				if (progress >= secondsNeeded || isExpired(quest)) {
					ApplicationStreamingStore.getStreamerActiveStreamMetadata = realFunc;
					FluxDispatcher.unsubscribe("QUESTS_SEND_HEARTBEAT_SUCCESS", handler);
					resolve(progress >= secondsNeeded);
				}
			};

			FluxDispatcher.subscribe("QUESTS_SEND_HEARTBEAT_SUCCESS", handler);
		});
	};

	const completeActivityQuest = async (quest, info, onProgress) => {
		const { secondsNeeded } = info;

		const channelId = ChannelStore?.getSortedPrivateChannels?.()?.[0]?.id
			?? Object.values(GuildChannelStore.getAllGuilds())
				.find(x => x != null && x.VOCAL?.length > 0)?.VOCAL[0]?.channel?.id;

		if (!channelId) {
			Logger.log('❌ No valid voice channel found', 'error');
			return false;
		}

		Logger.log(`🎯 Activity in channel: ${channelId}`, 'info');

		const streamKey = `call:${channelId}:${getRandomInt(1000, 9999)}`;

		for (let attempt = 0; attempt < CONFIG.ACTIVITY.maxAttempts; attempt++) {
			if (isExpired(quest)) {
				Logger.log('⚠️ Quest expired during process', 'warning');
				return false;
			}

			try {
				const res = await safeApiCall(() =>
					api.post({
						url: `/quests/${quest.id}/heartbeat`,
						body: { stream_key: streamKey, terminal: false }
					}), 'activity-heartbeat'
				);

				let progress = 0;
				try {
					progress = res.body?.progress?.PLAY_ACTIVITY?.value
						?? res.body?.progress?.play_activity?.value
						?? 0;
				} catch (e) { }

				Logger.log(`   Progress: ${progress}/${secondsNeeded}s`, 'progress');
				if (onProgress) onProgress(Math.floor(progress / secondsNeeded * 100), `${info.taskName} - ${Math.floor(progress / secondsNeeded * 100)}%`);

				if (progress >= secondsNeeded) {
					await safeApiCall(() =>
						api.post({
							url: `/quests/${quest.id}/heartbeat`,
							body: { stream_key: streamKey, terminal: true }
						}), 'activity-final'
					);
					return true;
				}
			} catch (err) {
				if (err.status === 400 || err.status === 404) return false;
				Logger.log(`⚠️ Heartbeat error: ${err.message}`, 'warning');
			}

			// Random heartbeat (anti-pattern)
			await delay(getRandomInt(CONFIG.ACTIVITY.heartbeatMin, CONFIG.ACTIVITY.heartbeatMax) * 1000);
		}

		Logger.log('❌ Max attempts reached', 'error');
		return false;
	};

	// ═══════════════════════════════════════════════════════════════
	// � AUTO-ACCEPT & AUTO-CLAIM
	// ═══════════════════════════════════════════════════════════════

	// Auto-accept: enroll in all available quests
	const autoAcceptQuests = async () => {
		let allQuestsInStore;
		try {
			allQuestsInStore = [...QuestsStore.quests.values()];
		} catch (e) {
			return { accepted: [], locked: [], enrolled: [] };
		}

		const toAccept = [];
		const alreadyEnrolled = [];

		allQuestsInStore.forEach(q => {
			if (!q?.config?.expiresAt || isExpired(q)) return;
			if (q.userStatus?.enrolledAt) {
				alreadyEnrolled.push(q);
				return;
			}
			toAccept.push(q);
		});

		const accepted = [];
		const locked = [];

		for (const quest of toAccept) {
			const questName = quest.config?.messages?.questName ?? 'Unknown';

			try {
				const res = await safeApiCall(() =>
					api.post({ url: `/quests/${quest.id}/enroll` }), 'enroll'
				);

				if (res.status === 200 || res.status === 204) {
					accepted.push(quest);
				} else {
					// Check for CAPTCHA or other blocks
					locked.push({ quest, reason: 'Blocked or CAPTCHA required' });
				}

				// Small random delay between accepts
				await delay(getRandomInt(1000, 2000));

			} catch (err) {
				if (err.status === 400 || err.status === 403) {
					locked.push({ quest, reason: 'CAPTCHA or enrollment blocked' });
				} else {
					locked.push({ quest, reason: err.message ?? 'Unknown error' });
				}
			}
		}

		return { accepted, locked, enrolled: alreadyEnrolled };
	};

	// Auto-claim: claim reward for completed quests
	const claimQuestReward = async (questId) => {
		try {
			const res = await safeApiCall(() =>
				api.post({ url: `/quests/${questId}/claim` }), 'claim'
			);
			return res.status === 200 || res.status === 204;
		} catch (err) {
			// Claim may require manual action (CAPTCHA, button click)
			return false;
		}
	};

	// ═══════════════════════════════════════════════════════════════
	// � MAIN PROCESSING
	// ═══════════════════════════════════════════════════════════════

	const processAllQuests = async () => {
		// Random initial delay (looks human)
		const initialDelay = getRandomInt(CONFIG.GENERAL.initialDelayMin, CONFIG.GENERAL.initialDelayMax);
		await delay(initialDelay);

		// === AUTO-ACCEPT PHASE ===
		const { accepted, locked, enrolled } = await autoAcceptQuests();

		// Build the full quest list for the panel
		let allQuests;
		try {
			allQuests = [...QuestsStore.quests.values()].filter(x =>
				!x.userStatus?.completedAt &&
				!isExpired(x)
			);
		} catch (e) {
			Logger.log('❌ Error getting quests: ' + e.message, 'error');
			return;
		}

		if (allQuests.length === 0) {
			Logger.log('❌ No pending quests', 'warning');
			Logger.log('💡 Accept a quest in Discover > Quests first', 'info');
			return;
		}

		// Separate auto from manual
		const autoQuests = [];
		const manualQuests = [];
		allQuests.forEach(q => {
			// Only auto-complete quests that are enrolled
			if (!q.userStatus?.enrolledAt) return;
			const taskConfig = q.config.taskConfig ?? q.config.taskConfigV2;
			const taskKeys = Object.keys(taskConfig?.tasks ?? {});
			const hasSupported = supportedTasks.some(t => taskKeys.includes(t));
			if (hasSupported) {
				autoQuests.push(q);
			} else {
				manualQuests.push(q);
			}
		});

		const quests = autoQuests;
		const lockedIds = locked.map(l => l.quest.id);

		Logger.log(`✅ ${quests.length} auto-completable, ${manualQuests.length} manual, ${locked.length} locked\n`, 'success');

		// Initialize visual panel with all quests
		VisualIndicator.init(allQuests);

		// Mark manual and locked quests in panel
		allQuests.forEach((q, i) => {
			const taskConfig = q.config.taskConfig ?? q.config.taskConfigV2;
			const taskKeys = Object.keys(taskConfig?.tasks ?? {});
			const hasSupported = supportedTasks.some(t => taskKeys.includes(t));

			if (lockedIds.includes(q.id)) {
				VisualIndicator.setQuestManual(i, 'LOCKED - Accept manually');
			} else if (!q.userStatus?.enrolledAt) {
				VisualIndicator.setQuestManual(i, 'Not enrolled');
			} else if (!hasSupported) {
				VisualIndicator.setQuestManual(i, taskKeys[0] || 'UNKNOWN');
			}
		});

		quests.forEach((q, i) => {
			const info = getQuestInfo(q);
			const pct = Math.floor(info.secondsDone / info.secondsNeeded * 100);
			Logger.log(`  [${i + 1}] ${info.questName} - ${pct}% (${info.taskName})`, 'info');
		});
		console.log('');

		Logger.log('🚀 Starting...\n', 'info');
		const globalStart = Date.now();
		let completedCount = 0;
		let processedCount = 0;

		// Process each quest sequentially (auto only)
		for (let i = 0; i < allQuests.length; i++) {
			const quest = allQuests[i];
			const taskConfig = quest.config.taskConfig ?? quest.config.taskConfigV2;
			const taskKeys = Object.keys(taskConfig?.tasks ?? {});
			const isManual = !supportedTasks.some(t => taskKeys.includes(t));

			if (isManual) continue; // Skip manual quests

			const info = getQuestInfo(quest);
			processedCount++;

			// Mark as active in panel
			VisualIndicator.setQuestActive(i, info.questName);

			let success = false;
			const questStart = Date.now();

			try {
				if (info.taskName === "WATCH_VIDEO" || info.taskName === "WATCH_VIDEO_ON_MOBILE") {
					success = await completeVideoQuest(quest, info, (pct, detail) => {
						VisualIndicator.setQuestProgress(i, pct, detail);
					});
				} else if (info.taskName === "PLAY_ON_DESKTOP") {
					success = await completeGameQuest(quest, info, (pct, detail) => {
						VisualIndicator.setQuestProgress(i, pct, detail);
					});
				} else if (info.taskName === "STREAM_ON_DESKTOP") {
					success = await completeStreamQuest(quest, info, (pct, detail) => {
						VisualIndicator.setQuestProgress(i, pct, detail);
					});
				} else if (info.taskName === "PLAY_ACTIVITY") {
					success = await completeActivityQuest(quest, info, (pct, detail) => {
						VisualIndicator.setQuestProgress(i, pct, detail);
					});
				}
			} catch (error) {
				Logger.log(`❌ Error: ${error.message}`, 'error');
			}

			const questTime = Math.floor((Date.now() - questStart) / 1000);
			if (success) {
				completedCount++;
				// Try to auto-claim the reward
				const claimed = await claimQuestReward(quest.id);
				if (claimed) {
					VisualIndicator.setQuestProgress(i, 100, `✅ Completed & claimed in ${questTime}s`);
				} else {
					VisualIndicator.setQuestProgress(i, 100, `Completed - Claim reward manually`);
				}
			}

			// Mark as done in panel
			VisualIndicator.setQuestDone(i, success);
			VisualIndicator.updateCounter(completedCount, quests.length);

			// Pause between quests
			if (processedCount < quests.length) {
				await delay(getRandomInt(CONFIG.GENERAL.betweenQuestsMin, CONFIG.GENERAL.betweenQuestsMax));
			}
		}

		// Final summary
		const totalTime = Math.floor((Date.now() - globalStart) / 1000);
		Logger.separator('═', 50);
		Logger.log('📈 FINAL SUMMARY', 'info');
		Logger.separator('─', 50);
		Logger.log(`✓ Completed: ${completedCount}/${quests.length}`, 'success');
		Logger.log(`⏱️ Total time: ${Logger.formatTime(totalTime)}`, 'info');
		Logger.separator('═', 50);

		// Final visual panel state
		VisualIndicator.setGlobalDone(completedCount === quests.length);

		// Auto-close after 8 seconds
		setTimeout(() => VisualIndicator.destroy(), 8000);
	};

	processAllQuests();

})();
