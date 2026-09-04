    const APP_VERSION = "v1.0.5";
    const CONFIG = {
      storageKey: "insight_pass_tracker_v26"
    };

    const HK_PUBLIC_HOLIDAYS = new Set([
      "2025-01-01", "2025-01-29", "2025-01-30", "2025-01-31", "2025-04-04",
      "2025-04-18", "2025-04-19", "2025-04-21", "2025-05-01", "2025-05-05",
      "2025-05-31", "2025-07-01", "2025-10-01", "2025-10-07", "2025-10-29",
      "2025-12-25", "2025-12-26",
      "2026-01-01", "2026-02-17", "2026-02-18", "2026-02-19", "2026-04-03",
      "2026-04-04", "2026-04-06", "2026-04-07", "2026-05-01", "2026-05-25",
      "2026-06-19", "2026-07-01", "2026-09-26", "2026-10-01", "2026-10-19",
      "2026-12-25", "2026-12-26",
      "2027-01-01", "2027-02-06", "2027-02-08", "2027-02-09", "2027-03-26",
      "2027-03-27", "2027-03-29", "2027-04-05", "2027-05-01", "2027-05-13",
      "2027-06-09", "2027-07-01", "2027-09-16", "2027-10-01", "2027-10-08",
      "2027-12-25", "2027-12-27",
      "2028-01-01", "2028-01-26", "2028-01-27", "2028-01-28", "2028-04-04",
      "2028-04-14", "2028-04-15", "2028-04-17", "2028-05-01", "2028-05-02",
      "2028-05-30", "2028-07-01", "2028-10-02", "2028-10-03", "2028-10-26",
      "2028-12-25", "2028-12-26"
    ]);

    function getDefaultState() {
      return {
        theme: "auto",
        timeFormat: "24h",
        passCategory: "2300",
        customPassPrice: 2000,
        memberFeeCategory: "100",
        ticketBaseType: "95",
        customTicketPrice: 100,
        enableMemberDiscount: false,
        enableMovieName: true,
        enableWatchDate: true,
        memberExpiry: "2027-04-30",
        passExpiry: "2027-04-30",
        movies: [],
        archivedSeasons: [],
        hasSeenNotice: false,
        hasCompletedSetup: false
      };
    }

    let state = loadState();
    let currentPointMode = "0";
    let editPointMode = "0";
    let toastTimer = null;
    let isUpdatingApp = false;
    let recordSortOrder = "newest";

    const htmlElement = document.documentElement;
    const toastNotification = document.getElementById("toastNotification");
    const toastMessage = document.getElementById("toastMessage");

    const noticeModal = document.getElementById("noticeModal");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const setupBanner = document.getElementById("setupBanner");
    const bottomNav = document.getElementById("bottomNav");
    const navIndicator = document.getElementById("navIndicator");
    const seasonDataMgmtCard = document.getElementById("seasonDataMgmtCard");
    const settingsDetailsCard = document.getElementById("settingsDetailsCard");
    const seasonDataMgmtDetails = document.getElementById("seasonDataMgmtDetails");
    const aboutTermsDetails = document.getElementById("aboutTermsDetails");

    const editTicketModal = document.getElementById("editTicketModal");
    const editTicketForm = document.getElementById("editTicketForm");
    const editTicketId = document.getElementById("editTicketId");
    const editMovieName = document.getElementById("editMovieName");
    const editMovieNameGroup = document.getElementById("editMovieNameGroup");
    const editPurchaseDateTime = document.getElementById("editPurchaseDateTime");
    const editWatchDateTime = document.getElementById("editWatchDateTime");
    const editWatchDateGroup = document.getElementById("editWatchDateGroup");
    const editChip0 = document.getElementById("editChip0");
    const editChip30 = document.getElementById("editChip30");
    const editChipCustom = document.getElementById("editChipCustom");
    const editCustomPointsWrap = document.getElementById("editCustomPointsWrap");
    const editCustomPointsInput = document.getElementById("editCustomPointsInput");
    const editTicketPriceTypeSelect = document.getElementById("editTicketPriceTypeSelect");
    const editAutoPriceOption = document.getElementById("editAutoPriceOption");
    const editAutoPriceHint = document.getElementById("editAutoPriceHint");
    const editAutoPriceHintText = document.getElementById("editAutoPriceHintText");
    const editItemCustomPriceWrap = document.getElementById("editItemCustomPriceWrap");
    const editItemCustomPriceInput = document.getElementById("editItemCustomPriceInput");
    const editToggleOnlineFee = document.getElementById("editToggleOnlineFee");
    const cancelEditBtn = document.getElementById("cancelEditBtn");

    const memberDateText = document.getElementById("memberDateText");
    const memberDaysText = document.getElementById("memberDaysText");
    const passDateText = document.getElementById("passDateText");
    const passDaysText = document.getElementById("passDaysText");

    const heroProgressValue = document.getElementById("heroProgressValue");
    const heroCountText = document.getElementById("heroCountText");
    const heroRemainingText = document.getElementById("heroRemainingText");
    const heroTargetEstimateText = document.getElementById("heroTargetEstimateText");
    const heroPercentOverlayText = document.getElementById("heroPercentOverlayText");
    const progressFill = document.getElementById("progressFill");

    const todayText = document.getElementById("todayText");
    const totalPointsText = document.getElementById("totalPointsText");
    const dailyLimitWarning = document.getElementById("dailyLimitWarning");

    const homeCtaAddBtn = document.getElementById("homeCtaAddBtn");
    const ticketForm = document.getElementById("ticketForm");
    const movieNameGroup = document.getElementById("movieNameGroup");
    const movieNameLabel = document.getElementById("movieNameLabel");
    const movieName = document.getElementById("movieName");

    const ticketPriceTypeSelect = document.getElementById("ticketPriceTypeSelect");
    const autoPriceOption = document.getElementById("autoPriceOption");
    const autoPriceHint = document.getElementById("autoPriceHint");
    const autoPriceHintText = document.getElementById("autoPriceHintText");
    const itemCustomPriceWrap = document.getElementById("itemCustomPriceWrap");
    const itemCustomPriceInput = document.getElementById("itemCustomPriceInput");
    const customDiscountHint = document.getElementById("customDiscountHint");
    const customDiscountHintText = document.getElementById("customDiscountHintText");
    const toggleOnlineFee = document.getElementById("toggleOnlineFee");

    const watchDateTime = document.getElementById("watchDateTime");
    const purchaseDateTime = document.getElementById("purchaseDateTime");
    const watchDateGroup = document.getElementById("watchDateGroup");

    const chip0 = document.getElementById("chip0");
    const chip30 = document.getElementById("chip30");
    const chipCustom = document.getElementById("chipCustom");
    const customPointsWrap = document.getElementById("customPointsWrap");
    const customPointsInput = document.getElementById("customPointsInput");

    const homeTicketList = document.getElementById("homeTicketList");
    const homeCurrentCountText = document.getElementById("homeCurrentCountText");
    const goRecordsCurrentBtn = document.getElementById("goRecordsCurrentBtn");
    const homeArchivedCard = document.getElementById("homeArchivedCard");
    const homeArchivedList = document.getElementById("homeArchivedList");
    const goRecordsArchiveBtn = document.getElementById("goRecordsArchiveBtn");

    const recordsTabCurrentBtn = document.getElementById("recordsTabCurrentBtn");
    const recordsTabArchiveBtn = document.getElementById("recordsTabArchiveBtn");
    const recordsCurrentSubView = document.getElementById("recordsCurrentSubView");
    const recordsArchiveSubView = document.getElementById("recordsArchiveSubView");
    const recordsFullCountText = document.getElementById("recordsFullCountText");
    const recordsFullTicketList = document.getElementById("recordsFullTicketList");
    const recordSortSelect = document.getElementById("recordSortSelect");
    const recordsArchiveListCard = document.getElementById("recordsArchiveListCard");
    const recordsArchiveFullList = document.getElementById("recordsArchiveFullList");
    const recordsSeasonDetailCard = document.getElementById("recordsSeasonDetailCard");
    const backToArchiveListBtn = document.getElementById("backToArchiveListBtn");
    const detailSeasonTitleText = document.getElementById("detailSeasonTitleText");
    const detailSeasonMetaText = document.getElementById("detailSeasonMetaText");
    const detailSeasonMovieList = document.getElementById("detailSeasonMovieList");

    const shareAppBtn = document.getElementById("shareAppBtn");
    const manualCheckUpdateBtn = document.getElementById("manualCheckUpdateBtn");
    const updateStatusText = document.getElementById("updateStatusText");

    const themeSelect = document.getElementById("themeSelect");
    const timeFormatSelect = document.getElementById("timeFormatSelect");
    const passCategorySelect = document.getElementById("passCategorySelect");
    const customPassPriceWrap = document.getElementById("customPassPriceWrap");
    const customPassPriceInput = document.getElementById("customPassPriceInput");
    const memberFeeSelect = document.getElementById("memberFeeSelect");
    const ticketBaseSelect = document.getElementById("ticketBaseSelect");
    const customTicketPriceWrap = document.getElementById("customTicketPriceWrap");
    const customTicketPriceInput = document.getElementById("customTicketPriceInput");
    const toggleMemberDiscount = document.getElementById("toggleMemberDiscount");

    const toggleMovieName = document.getElementById("toggleMovieName");
    const toggleWatchDate = document.getElementById("toggleWatchDate");
    const inputMemberExpiry = document.getElementById("inputMemberExpiry");
    const inputPassExpiry = document.getElementById("inputPassExpiry");
    const saveSettingsBtn = document.getElementById("saveSettingsBtn");

    const startNewSeasonBtn = document.getElementById("startNewSeasonBtn");
    const exportDataBtn = document.getElementById("exportDataBtn");
    const importDataBtn = document.getElementById("importDataBtn");
    const importFileInput = document.getElementById("importFileInput");
    const resetAllBtn = document.getElementById("resetAllBtn");

    init();

    function init() {
      applyTheme(state.theme);
      setDefaultDateTimes();
      bindEvents();
      initNavGesture();
      populateSettingsFormFromState();
      updateAddTicketPricePreview();
      render();
      initServiceWorkerAndAutoUpdate();

      if (!state.hasSeenNotice) {
        noticeModal.classList.remove("hidden");
      } else if (!state.hasCompletedSetup) {
        enterMandatorySetup();
      }
    }

    function isNewerVersion(serverVer, currentVer) {
      if (!serverVer || !currentVer) return false;
      const parse = (v) => v.toString().replace(/^[^\d]*/, '').split('.').map(n => parseInt(n, 10) || 0);
      const s = parse(serverVer);
      const c = parse(currentVer);
      
      const maxLength = Math.max(s.length, c.length);
      for (let i = 0; i < maxLength; i++) {
        const sVal = s[i] || 0;
        const cVal = c[i] || 0;
        if (sVal > cVal) return true;
        if (sVal < cVal) return false;
      }
      return false;
    }

    function initServiceWorkerAndAutoUpdate() {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js').then((reg) => {
          reg.addEventListener('updatefound', () => {
            const newWorker = reg.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  newWorker.postMessage({ type: 'SKIP_WAITING' });
                }
              });
            }
          });
        }).catch(err => {
          console.warn("Service Worker 註冊失敗:", err);
        });

        let refreshing = false;
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          if (!refreshing && isUpdatingApp) {
            refreshing = true;
            window.location.reload();
          }
        });
      }

      setTimeout(() => {
        checkAppVersion(false);
      }, 1200);
    }

    async function checkAppVersion(isManual = false) {
      if (isManual) {
        if (manualCheckUpdateBtn) manualCheckUpdateBtn.disabled = true;
        if (updateStatusText) updateStatusText.textContent = "正在檢查更新...";
        showToast("正在檢查更新...", "info");
      }

      try {
        const response = await fetch(`version.json?_t=${Date.now()}`, {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            "Pragma": "no-cache"
          }
        });

        if (!response.ok) {
          throw new Error("無法連接至更新伺服器");
        }

        const data = await response.json();
        const serverVersion = data.version;

        if (serverVersion && isNewerVersion(serverVersion, APP_VERSION)) {
          if (updateStatusText) {
            updateStatusText.textContent = `發現新版本 ${serverVersion}，正在更新...`;
          }
          showToast(`發現新版本 ${serverVersion}，正在更新...`, "info");

          if ('serviceWorker' in navigator) {
            const reg = await navigator.serviceWorker.ready;
            
            if (reg.waiting) {
              isUpdatingApp = true;
              reg.waiting.postMessage({ type: 'SKIP_WAITING' });
              return;
            }

            reg.addEventListener('updatefound', () => {
              const newWorker = reg.installing;
              if (newWorker) {
                newWorker.addEventListener('statechange', () => {
                  if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    isUpdatingApp = true;
                    newWorker.postMessage({ type: 'SKIP_WAITING' });
                  } else if (newWorker.state === 'redundant') {
                    if (isManual) {
                      if (updateStatusText) updateStatusText.textContent = "更新安裝失敗，請稍後重試";
                      showToast("更新安裝失敗，請稍後重試", "error");
                    }
                  }
                });
              }
            });

            await reg.update();
          } else {
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }

        } else {
          if (isManual) {
            if (updateStatusText) {
              updateStatusText.textContent = `目前已是最新版本 (${APP_VERSION})`;
            }
            showToast(`目前已是最新版本 (${APP_VERSION})`, "success");
          } else {
            if (updateStatusText) {
              updateStatusText.textContent = `目前已是最新版本 (${APP_VERSION})`;
            }
          }
        }
      } catch (err) {
        console.warn("檢查版本發生錯誤:", err);
        if (isManual) {
          if (updateStatusText) {
            updateStatusText.textContent = "檢查更新失敗，請檢查網絡連線";
          }
          showToast("檢查更新失敗，請稍後重試", "error");
        }
      } finally {
        if (isManual && manualCheckUpdateBtn) {
          setTimeout(() => {
            manualCheckUpdateBtn.disabled = false;
          }, 1000);
        }
      }
    }

    function showToast(msg, type = 'auto') {
      if (!toastNotification || !toastMessage) return;

      const iconWrap = document.getElementById("toastIconWrap");
      let resolvedType = type;
      if (resolvedType === 'auto') {
        if (msg.includes('失敗') || msg.includes('錯誤') || msg.includes('刪除')) {
          resolvedType = 'error';
        } else if (msg.includes('更新中') || msg.includes('正在')) {
          resolvedType = 'info';
        } else {
          resolvedType = 'success';
        }
      }

      if (iconWrap) {
        if (resolvedType === 'error') {
          iconWrap.innerHTML = `
            <svg class="icon icon-stroke" viewBox="0 0 24 24" width="16" height="16" style="color: var(--danger);">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>`;
        } else if (resolvedType === 'info') {
          iconWrap.innerHTML = `
            <svg class="icon icon-stroke" viewBox="0 0 24 24" width="16" height="16" style="color: #0a84ff;">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path>
            </svg>`;
        } else {
          iconWrap.innerHTML = `
            <svg class="icon icon-stroke" viewBox="0 0 24 24" width="16" height="16" style="color: #30d158;">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>`;
        }
      }

      toastMessage.textContent = msg;
      toastNotification.classList.add("show");
      
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        toastNotification.classList.remove("show");
      }, 2400);
    }

    function loadState() {
      try {
        const raw = localStorage.getItem(CONFIG.storageKey);
        if (!raw) return getDefaultState();
        return { ...getDefaultState(), ...JSON.parse(raw) };
      } catch (e) {
        return getDefaultState();
      }
    }

    function saveState() {
      localStorage.setItem(CONFIG.storageKey, JSON.stringify(state));
    }

    function applyTheme(theme) {
      htmlElement.setAttribute("data-theme", theme);
    }

    function enterMandatorySetup() {
      setupBanner.classList.remove("hidden");
      bottomNav.classList.add("disabled");
      seasonDataMgmtCard.classList.add("disabled-card");
      saveSettingsBtn.textContent = "完成初次設定，開始使用";
      switchView("view-settings");
    }

    function isPublicHoliday(dateStr) {
      return HK_PUBLIC_HOLIDAYS.has(dateStr);
    }

    function isStudentUser() {
      return state.ticketBaseType === "75" || state.passCategory === "1250";
    }

    function setDefaultDateTimes() {
      const now = new Date();
      const tzOffset = now.getTimezoneOffset() * 60000;
      const localISOTime = (new Date(now - tzOffset)).toISOString().slice(0, 16);
      purchaseDateTime.value = localISOTime;
      watchDateTime.value = localISOTime;
    }

    function formatDateTimeDisplay(dtStr) {
      if (!dtStr) return "";
      const parts = dtStr.split("T");
      const datePart = parts[0] || "";
      const timePart = parts[1] || "";

      if (!timePart) return datePart;

      if (state.timeFormat === "12h") {
        const [hStr, mStr] = timePart.split(":");
        const hour = parseInt(hStr, 10) || 0;
        const period = hour >= 12 ? "下午" : "上午";
        let displayHour = hour % 12;
        if (displayHour === 0) displayHour = 12;
        const hourFormatted = String(displayHour).padStart(2, '0');
        return `${datePart} ${period} ${hourFormatted}:${mStr}`;
      } else {
        return `${datePart} ${timePart}`;
      }
    }

    function determineTicketPrice(dateTimeStr) {
      const isStudent = isStudentUser();

      if (isStudent) {
        return {
          price: 75,
          rawPrice: 75,
          type: "student",
          label: "學生票價 ($75)",
          description: "學生優惠"
        };
      }

      let dateStr = getLocalDateString();
      let hour = 14;
      let dayOfWeek = 3;

      if (dateTimeStr) {
        const parts = dateTimeStr.split("T");
        dateStr = parts[0] || dateStr;
        if (parts[1]) {
          const timeParts = parts[1].split(":");
          hour = parseInt(timeParts[0], 10) || 0;
        }
        const [y, m, d] = dateStr.split("-").map(Number);
        const dt = new Date(y, m - 1, d);
        dayOfWeek = dt.getDay();
      }

      if (hour < 13) {
        return {
          price: 60,
          rawPrice: 60,
          type: "early",
          label: "早場優惠 ($60)",
          description: "13:00 前早場時段"
        };
      }

      const isTuesday = (dayOfWeek === 2);
      const isHoliday = isPublicHoliday(dateStr);

      if (isTuesday && !isHoliday) {
        return {
          price: 75,
          rawPrice: 75,
          type: "tuesday",
          label: "星期二特惠 ($75)",
          description: "星期二(公眾假期除外)"
        };
      }

      let base = 95;
      if (state.ticketBaseType === "custom") {
        base = parseFloat(state.customTicketPrice) || 95;
      }

      let finalPrice = base;
      let discNote = "";
      if (state.enableMemberDiscount) {
        finalPrice = base * 0.8;
        discNote = ` (8折 $${finalPrice.toFixed(0)})`;
      }

      const labelName = state.ticketBaseType === "custom" 
        ? `自訂預設 ($${base}${discNote})` 
        : `成人正價 ($${base}${discNote})`;

      return {
        price: finalPrice,
        rawPrice: base,
        type: "adult",
        label: labelName,
        description: isTuesday && isHoliday ? "星期二逢公眾假期，按正常票價處理" : "一般正價時段"
      };
    }

    function getTicketUnitPrice() {
      let base = 95;
      if (state.ticketBaseType === "75") base = 75;
      else if (state.ticketBaseType === "60") base = 60;
      else if (state.ticketBaseType === "custom") base = parseFloat(state.customTicketPrice) || 95;

      if (state.enableMemberDiscount && (state.ticketBaseType === "95" || state.ticketBaseType === "custom")) {
        return base * 0.8;
      }
      return base;
    }

    function updateAddTicketPricePreview() {
      const targetDateTime = (state.enableWatchDate && watchDateTime.value) ? watchDateTime.value : purchaseDateTime.value;
      const autoInfo = determineTicketPrice(targetDateTime);

      autoPriceOption.textContent = `⚡ 系統判定：${autoInfo.label}`;
      autoPriceHintText.textContent = `系統判定：${autoInfo.label} [${autoInfo.description}]`;

      const mode = ticketPriceTypeSelect.value;
      if (mode === "auto") {
        autoPriceHint.style.display = "flex";
        itemCustomPriceWrap.style.display = "none";
      } else if (mode === "custom") {
        autoPriceHint.style.display = "none";
        itemCustomPriceWrap.style.display = "block";
        updateCustomDiscountPreview();
      } else {
        autoPriceHint.style.display = "none";
        itemCustomPriceWrap.style.display = "none";
      }
    }

    function updateCustomDiscountPreview() {
      if (state.enableMemberDiscount) {
        customDiscountHint.style.display = "flex";
        const val = parseFloat(itemCustomPriceInput.value) || 0;
        const discounted = (val * 0.8).toFixed(1).replace('.0', '');
        customDiscountHintText.textContent = `已啟用會員 8 折：輸入 $${val}，實際回本價值按 $${discounted} 計算`;
      } else {
        customDiscountHint.style.display = "none";
      }
    }

    function updateEditTicketPricePreview() {
      const targetDateTime = (state.enableWatchDate && editWatchDateTime.value) ? editWatchDateTime.value : editPurchaseDateTime.value;
      const autoInfo = determineTicketPrice(targetDateTime);

      editAutoPriceOption.textContent = `⚡ 系統判定：${autoInfo.label}`;
      editAutoPriceHintText.textContent = `系統判定：${autoInfo.label} [${autoInfo.description}]`;

      const mode = editTicketPriceTypeSelect.value;
      if (mode === "auto") {
        editAutoPriceHint.style.display = "flex";
        editItemCustomPriceWrap.style.display = "none";
      } else if (mode === "custom") {
        editAutoPriceHint.style.display = "none";
        editItemCustomPriceWrap.style.display = "block";
      } else {
        editAutoPriceHint.style.display = "none";
        editItemCustomPriceWrap.style.display = "none";
      }
    }

    function setEditPointMode(mode) {
      editPointMode = mode;
      editChip0.classList.toggle("active", mode === "0");
      editChip30.classList.toggle("active", mode === "30");
      editChipCustom.classList.toggle("active", mode === "custom");
      editCustomPointsWrap.style.display = mode === "custom" ? "block" : "none";
    }

    function openEditTicketModal(id) {
      closeAllSwipes();
      const ticket = state.movies.find(m => m.id === id);
      if (!ticket) return;

      editTicketId.value = ticket.id;
      editMovieName.value = ticket.name || "";
      editMovieName.required = state.enableMovieName;
      editMovieNameGroup.style.display = state.enableMovieName ? "block" : "none";

      editPurchaseDateTime.value = ticket.purchaseTime || "";
      editWatchDateTime.value = ticket.watchTime || "";
      editWatchDateGroup.style.display = state.enableWatchDate ? "block" : "none";
      editToggleOnlineFee.checked = !!ticket.hasOnlineFee;

      const pts = ticket.points || 0;
      if (pts === 0) {
        setEditPointMode("0");
      } else if (pts === 30) {
        setEditPointMode("30");
      } else {
        setEditPointMode("custom");
        editCustomPointsInput.value = pts;
      }

      editTicketPriceTypeSelect.value = "auto";
      editItemCustomPriceInput.value = "";
      updateEditTicketPricePreview();

      editTicketModal.classList.remove("hidden");
    }

    function closeEditTicketModal() {
      editTicketModal.classList.add("hidden");
    }

    function hasSettingsChanged() {
      if (themeSelect.value !== state.theme) return true;
      if (timeFormatSelect.value !== (state.timeFormat || "24h")) return true;
      if (passCategorySelect.value !== state.passCategory) return true;
      if (passCategorySelect.value === "custom" && parseFloat(customPassPriceInput.value) !== state.customPassPrice) return true;
      if (memberFeeSelect.value !== state.memberFeeCategory) return true;
      if (ticketBaseSelect.value !== state.ticketBaseType) return true;
      if (ticketBaseSelect.value === "custom" && parseFloat(customTicketPriceInput.value) !== state.customTicketPrice) return true;
      if (toggleMemberDiscount.checked !== state.enableMemberDiscount) return true;
      if (toggleMovieName.checked !== state.enableMovieName) return true;
      if (toggleWatchDate.checked !== state.enableWatchDate) return true;
      if (inputMemberExpiry.value !== state.memberExpiry) return true;
      if (inputPassExpiry.value !== state.passExpiry) return true;
      return false;
    }

    function populateSettingsFormFromState() {
      themeSelect.value = state.theme;
      timeFormatSelect.value = state.timeFormat || "24h";
      passCategorySelect.value = state.passCategory;
      customPassPriceInput.value = state.customPassPrice;
      customPassPriceWrap.style.display = state.passCategory === "custom" ? "block" : "none";

      memberFeeSelect.value = state.memberFeeCategory;
      ticketBaseSelect.value = state.ticketBaseType;
      customTicketPriceInput.value = state.customTicketPrice;
      customTicketPriceWrap.style.display = state.ticketBaseType === "custom" ? "block" : "none";
      toggleMemberDiscount.checked = state.enableMemberDiscount;

      toggleMovieName.checked = state.enableMovieName;
      toggleWatchDate.checked = state.enableWatchDate;
      inputMemberExpiry.value = state.memberExpiry;
      inputPassExpiry.value = state.passExpiry;
    }

    function switchView(targetViewId) {
      const activeView = document.querySelector(".view.active");
      
      if (!state.hasCompletedSetup && targetViewId !== "view-settings") {
        return false;
      }

      if (activeView && activeView.id === "view-settings" && targetViewId !== "view-settings") {
        if (hasSettingsChanged()) {
          const leave = confirm("⚠️ 你所作的設定尚未儲存，確定要離開嗎？\n\n點擊「確定」將捨棄未儲存的變更。\n點擊「取消」保留在設定頁面進行儲存。");
          if (!leave) {
            syncNavToActiveView(true);
            return false;
          }
          populateSettingsFormFromState();
          applyTheme(state.theme);
        }
      }

      if (activeView && activeView.id === targetViewId) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return true;
      }

      document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
      const targetView = document.getElementById(targetViewId);
      if (targetView) targetView.classList.add("active");
      window.scrollTo({ top: 0, behavior: "instant" });

      syncNavToActiveView(true);

      if (targetViewId === "view-settings") {
        if (settingsDetailsCard) settingsDetailsCard.open = true;
        if (seasonDataMgmtDetails) seasonDataMgmtDetails.open = false;
        populateSettingsFormFromState();
      } else {
        if (settingsDetailsCard) settingsDetailsCard.open = false;
      }

      if (aboutTermsDetails && targetViewId !== "view-about") {
        aboutTermsDetails.open = false;
      }

      if (targetViewId === "view-add") {
        updateAddTicketPricePreview();
      }

      return true;
    }

    function syncNavToActiveView(animate = true) {
      const activeView = document.querySelector(".view.active");
      if (!activeView || !window.setActiveBtn || !window.moveIndicatorTo) return;
      const viewId = activeView.id;
      
      if (viewId === "view-add") {
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        if (navIndicator) navIndicator.style.opacity = '0';
      } else {
        if (navIndicator) navIndicator.style.opacity = '1';
        const matchingBtn = bottomNav.querySelector(`.nav-btn[data-target="${viewId}"]`);
        if (matchingBtn) {
          window.setActiveBtn(matchingBtn);
          window.moveIndicatorTo(matchingBtn, animate);
        }
      }
    }

    function getLocalDateString(dateObj = new Date()) {
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const day = String(dateObj.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }

    function initNavGesture() {
      const nav = bottomNav;
      const indicator = navIndicator;
      const navBtns = Array.from(nav.querySelectorAll('.nav-btn'));
      let currentActiveBtn = nav.querySelector('.nav-btn.active') || navBtns[0];

      let isPointerDown = false;
      let isDragging = false;
      let startX = 0;
      let activePointerId = null;
      const DRAG_THRESHOLD = 6;

      function moveIndicatorTo(btn, animate = true) {
        if (!btn || !indicator) return;
        const navRect = nav.getBoundingClientRect();
        const btnRect = btn.getBoundingClientRect();

        const targetX = btnRect.left - navRect.left;
        const targetWidth = btnRect.width;

        indicator.style.transition = animate 
          ? 'transform 0.3s cubic-bezier(0.2, 0.9, 0.3, 1.1), width 0.3s ease, opacity 0.2s ease' 
          : 'opacity 0.2s ease';
        indicator.style.width = `${targetWidth}px`;
        indicator.style.transform = `translateX(${targetX}px)`;
      }

      function setActiveBtn(btn) {
        if (!btn) return;
        navBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentActiveBtn = btn;
      }

      function getClosestBtn(clientX) {
        let closestBtn = currentActiveBtn;
        let minDistance = Infinity;

        navBtns.forEach(btn => {
          const rect = btn.getBoundingClientRect();
          const btnCenterX = rect.left + rect.width / 2;
          const dist = Math.abs(clientX - btnCenterX);
          if (dist < minDistance) {
            minDistance = dist;
            closestBtn = btn;
          }
        });

        return closestBtn;
      }

      window.moveIndicatorTo = moveIndicatorTo;
      window.setActiveBtn = setActiveBtn;

      setTimeout(() => moveIndicatorTo(currentActiveBtn, false), 50);

      nav.addEventListener('pointerdown', (e) => {
        if (e.target.closest('.nav-btn-plus')) return;
        const clickedBtn = e.target.closest('.nav-btn');
        if (!clickedBtn) return;

        isPointerDown = true;
        isDragging = false;
        startX = e.clientX;
        activePointerId = e.pointerId;
      });

      nav.addEventListener('pointermove', (e) => {
        if (!isPointerDown) return;
        const deltaX = e.clientX - startX;

        if (!isDragging && Math.abs(deltaX) > DRAG_THRESHOLD) {
          isDragging = true;
          indicator.style.opacity = '1';
          indicator.style.transition = 'none';
          try { nav.setPointerCapture(activePointerId); } catch (_) {}
        }

        if (isDragging) {
          const navRect = nav.getBoundingClientRect();
          const pointerX = e.clientX - navRect.left;
          const indicatorWidth = indicator.offsetWidth || 50;
          const clampedX = Math.max(4, Math.min(pointerX - indicatorWidth / 2, navRect.width - indicatorWidth - 4));
          indicator.style.transform = `translateX(${clampedX}px)`;

          const closestBtn = getClosestBtn(e.clientX);
          if (closestBtn && closestBtn !== currentActiveBtn) {
            navBtns.forEach(b => b.classList.remove('active'));
            closestBtn.classList.add('active');
            currentActiveBtn = closestBtn;
          }
        }
      });

      function handlePointerEnd(e) {
        if (!isPointerDown) return;

        if (isDragging) {
          isDragging = false;
          try { nav.releasePointerCapture(activePointerId); } catch (_) {}
          const targetBtn = getClosestBtn(e.clientX);
          const targetTarget = targetBtn ? targetBtn.getAttribute('data-target') : 'view-home';
          const success = switchView(targetTarget);
          if (!success) {
            syncNavToActiveView(true);
          }
        } else {
          const clickedBtn = e.target.closest('.nav-btn');
          if (clickedBtn) {
            const targetTarget = clickedBtn.getAttribute('data-target');
            const success = switchView(targetTarget);
            if (!success) {
              syncNavToActiveView(true);
            }
          }
        }

        isPointerDown = false;
        activePointerId = null;
      }

      nav.addEventListener('pointerup', handlePointerEnd);
      nav.addEventListener('pointercancel', handlePointerEnd);
      window.addEventListener('resize', () => moveIndicatorTo(currentActiveBtn, false));
    }

    function closeAllSwipes() {
      document.querySelectorAll('.swipe-item').forEach(item => {
        const content = item.querySelector('.swipe-content');
        if (content) {
          content.style.transition = 'transform 0.25s cubic-bezier(0.25, 1, 0.5, 1)';
          content.style.transform = 'translateX(0px)';
        }
        const leftAction = item.querySelector('.swipe-actions-left');
        const rightAction = item.querySelector('.swipe-actions-right');
        if (leftAction) { leftAction.style.opacity = '0'; leftAction.style.visibility = 'hidden'; }
        if (rightAction) { rightAction.style.opacity = '0'; rightAction.style.visibility = 'hidden'; }
      });
    }

    function bindEvents() {
      closeModalBtn.addEventListener("click", () => {
        state.hasSeenNotice = true;
        saveState();
        noticeModal.classList.add("hidden");
        
        if (!state.hasCompletedSetup) {
          enterMandatorySetup();
        }
      });

      document.addEventListener('pointerdown', (e) => {
        if (!e.target.closest('.swipe-item')) {
          closeAllSwipes();
        }
      });

      const plusBtn = bottomNav.querySelector('.nav-btn-plus');
      if (plusBtn) {
        plusBtn.addEventListener('click', () => switchView('view-add'));
      }

      homeCtaAddBtn.addEventListener("click", () => switchView("view-add"));

      goRecordsCurrentBtn.addEventListener("click", () => {
        switchView("view-records");
        switchRecordsSubTab("current");
      });

      goRecordsArchiveBtn.addEventListener("click", () => {
        switchView("view-records");
        switchRecordsSubTab("archive");
      });

      recordsTabCurrentBtn.addEventListener("click", () => switchRecordsSubTab("current"));
      recordsTabArchiveBtn.addEventListener("click", () => switchRecordsSubTab("archive"));

      recordSortSelect.addEventListener("change", () => {
        recordSortOrder = recordSortSelect.value;
        render();
      });

      backToArchiveListBtn.addEventListener("click", () => {
        recordsSeasonDetailCard.classList.add("hidden");
        recordsArchiveListCard.classList.remove("hidden");
      });

      if (manualCheckUpdateBtn) {
        manualCheckUpdateBtn.addEventListener("click", () => {
          checkAppVersion(true);
        });
      }

      shareAppBtn.addEventListener("click", async () => {
        const shareData = {
          title: 'Insight Pass 回本計數機',
          text: '免費觀影紀錄與回本計算工具，快啲試下！',
          url: 'https://ricky-lk.github.io/insight-pass-calculator'
        };

        if (navigator.share) {
          try {
            await navigator.share(shareData);
          } catch (err) {}
        } else {
          try {
            await navigator.clipboard.writeText(shareData.url);
            alert("分享連結已成功複製至剪貼簿！");
          } catch (err) {
            alert(`分享網址：${shareData.url}`);
          }
        }
      });

      chip0.addEventListener("click", () => setPointMode("0"));
      chip30.addEventListener("click", () => setPointMode("30"));
      chipCustom.addEventListener("click", () => setPointMode("custom"));

      editChip0.addEventListener("click", () => setEditPointMode("0"));
      editChip30.addEventListener("click", () => setEditPointMode("30"));
      editChipCustom.addEventListener("click", () => setEditPointMode("custom"));

      cancelEditBtn.addEventListener("click", closeEditTicketModal);

      editTicketPriceTypeSelect.addEventListener("change", updateEditTicketPricePreview);
      editPurchaseDateTime.addEventListener("input", updateEditTicketPricePreview);
      editWatchDateTime.addEventListener("input", updateEditTicketPricePreview);

      themeSelect.addEventListener("change", () => {
        applyTheme(themeSelect.value);
      });

      passCategorySelect.addEventListener("change", () => {
        customPassPriceWrap.style.display = passCategorySelect.value === "custom" ? "block" : "none";
        if (passCategorySelect.value === "1250") {
          ticketBaseSelect.value = "75";
          customTicketPriceWrap.style.display = "none";
        }
      });

      ticketBaseSelect.addEventListener("change", () => {
        customTicketPriceWrap.style.display = ticketBaseSelect.value === "custom" ? "block" : "none";
      });

      ticketPriceTypeSelect.addEventListener("change", updateAddTicketPricePreview);
      purchaseDateTime.addEventListener("input", updateAddTicketPricePreview);
      watchDateTime.addEventListener("input", updateAddTicketPricePreview);
      itemCustomPriceInput.addEventListener("input", updateCustomDiscountPreview);

      /* 新增戲飛表單提交 */
      ticketForm.addEventListener("submit", (e) => {
        e.preventDefault();

        let nameVal = movieName.value.trim();
        if (state.enableMovieName && !nameVal) {
          alert("請填寫電影名稱！");
          return;
        }

        if (!purchaseDateTime.value) {
          alert("請選擇購買日期與時間！");
          return;
        }

        const inputDateStr = purchaseDateTime.value.slice(0, 10);
        const countOnInputDate = state.movies.filter(m => m.purchaseTime && m.purchaseTime.slice(0, 10) === inputDateStr).length;

        if (countOnInputDate >= 3) {
          const confirmAdd = confirm(`⚠️ 提示：你於 ${inputDateStr} 已記錄 ${countOnInputDate} 張戲飛。\n根據官方 Insight Pass 條款，每日最多可領取 3 張戲飛。\n\n你確定仍要繼續記錄這張戲飛嗎？`);
          if (!confirmAdd) return;
        }

        let pointsVal = 0;
        if (currentPointMode === "0") pointsVal = 0;
        else if (currentPointMode === "30") pointsVal = 30;
        else pointsVal = parseInt(customPointsInput.value, 10) || 0;

        const targetDateTime = (state.enableWatchDate && watchDateTime.value) ? watchDateTime.value : purchaseDateTime.value;
        const autoResult = determineTicketPrice(targetDateTime);

        let finalTicketPrice = autoResult.price;
        const selectMode = ticketPriceTypeSelect.value;

        if (selectMode === "auto") {
          finalTicketPrice = autoResult.price;
        } else if (selectMode === "custom") {
          const rawCustom = parseFloat(itemCustomPriceInput.value) || getTicketUnitPrice();
          finalTicketPrice = state.enableMemberDiscount ? (rawCustom * 0.8) : rawCustom;
        } else if (selectMode === "60") {
          finalTicketPrice = 60;
        } else if (selectMode === "75_tue" || selectMode === "75_stu") {
          finalTicketPrice = 75;
        } else if (selectMode === "95") {
          finalTicketPrice = state.enableMemberDiscount ? 76 : 95;
        }

        const hasFee = toggleOnlineFee.checked;
        const netPrice = Math.max(0, finalTicketPrice - (hasFee ? 10 : 0));

        state.movies.unshift({
          id: Date.now().toString(),
          name: nameVal,
          price: netPrice,
          rawPrice: finalTicketPrice,
          hasOnlineFee: hasFee,
          purchaseTime: purchaseDateTime.value,
          watchTime: state.enableWatchDate ? watchDateTime.value : null,
          points: pointsVal
        });

        saveState();
        movieName.value = "";
        itemCustomPriceInput.value = "";
        toggleOnlineFee.checked = false;
        ticketPriceTypeSelect.value = "auto";
        setDefaultDateTimes();
        setPointMode("0");
        updateAddTicketPricePreview();
        render();
        switchView("view-home");
        showToast("已增加戲飛記錄", "success");
      });

      /* 編輯戲飛表單提交 */
      editTicketForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const id = editTicketId.value;
        const index = state.movies.findIndex(m => m.id === id);
        if (index === -1) return;

        let nameVal = editMovieName.value.trim();
        if (state.enableMovieName && !nameVal) {
          alert("請填寫電影名稱！");
          return;
        }

        let pointsVal = 0;
        if (editPointMode === "0") pointsVal = 0;
        else if (editPointMode === "30") pointsVal = 30;
        else pointsVal = parseInt(editCustomPointsInput.value, 10) || 0;

        const targetDateTime = (state.enableWatchDate && editWatchDateTime.value) ? editWatchDateTime.value : editPurchaseDateTime.value;
        const autoResult = determineTicketPrice(targetDateTime);

        let finalTicketPrice = autoResult.price;
        const selectMode = editTicketPriceTypeSelect.value;

        if (selectMode === "auto") {
          finalTicketPrice = autoResult.price;
        } else if (selectMode === "custom") {
          const rawCustom = parseFloat(editItemCustomPriceInput.value) || getTicketUnitPrice();
          finalTicketPrice = state.enableMemberDiscount ? (rawCustom * 0.8) : rawCustom;
        } else if (selectMode === "60") {
          finalTicketPrice = 60;
        } else if (selectMode === "75_tue" || selectMode === "75_stu") {
          finalTicketPrice = 75;
        } else if (selectMode === "95") {
          finalTicketPrice = state.enableMemberDiscount ? 76 : 95;
        }

        const hasFee = editToggleOnlineFee.checked;
        const netPrice = Math.max(0, finalTicketPrice - (hasFee ? 10 : 0));

        state.movies[index] = {
          ...state.movies[index],
          name: nameVal,
          price: netPrice,
          rawPrice: finalTicketPrice,
          hasOnlineFee: hasFee,
          purchaseTime: editPurchaseDateTime.value,
          watchTime: state.enableWatchDate ? editWatchDateTime.value : null,
          points: pointsVal
        };

        saveState();
        closeEditTicketModal();
        render();
        showToast("已成功修改戲飛資料", "success");
      });

      /* 儲存設定按鈕 */
      saveSettingsBtn.addEventListener("click", () => {
        state.theme = themeSelect.value;
        state.timeFormat = timeFormatSelect.value;
        state.passCategory = passCategorySelect.value;
        state.customPassPrice = parseFloat(customPassPriceInput.value) || 2000;
        state.memberFeeCategory = memberFeeSelect.value;
        state.ticketBaseType = ticketBaseSelect.value;
        state.customTicketPrice = parseFloat(customTicketPriceInput.value) || 100;
        state.enableMemberDiscount = toggleMemberDiscount.checked;
        state.enableMovieName = toggleMovieName.checked;
        state.enableWatchDate = toggleWatchDate.checked;
        state.memberExpiry = inputMemberExpiry.value || "2027-04-30";
        state.passExpiry = inputPassExpiry.value || "2027-04-30";

        const isFirstTime = !state.hasCompletedSetup;
        state.hasCompletedSetup = true;

        saveState();
        applyTheme(state.theme);
        updateAddTicketPricePreview();
        render();

        if (isFirstTime) {
          setupBanner.classList.add("hidden");
          bottomNav.classList.remove("disabled");
          seasonDataMgmtCard.classList.remove("disabled-card");
          saveSettingsBtn.textContent = "儲存設定";
          showToast("初始化設定已完成！", "success");
          switchView("view-home");
        } else {
          showToast("設定已成功儲存", "success");
        }
      });

      startNewSeasonBtn.addEventListener("click", () => {
        if (!confirm("確定要結算本年度並開始新一年度？\n本年度的完整數據與觀影明細將封存保留，而首頁本年度紀錄將重新開始。")) return;

        const seasonTitle = prompt("請輸入新年度的名稱（例如：2027-2028 年度）：", "2026-2027 年度封存");
        if (!seasonTitle) return;

        const totalCost = getTotalCost();
        const unitPrice = getTicketUnitPrice();
        const count = state.movies.length;
        const targetCount = unitPrice > 0 ? Math.ceil(totalCost / unitPrice) : 0;
        const recoveredVal = state.movies.reduce((sum, item) => sum + (item.price !== undefined ? item.price : unitPrice), 0);

        if (!state.archivedSeasons) state.archivedSeasons = [];
        state.archivedSeasons.unshift({
          id: Date.now().toString(),
          title: seasonTitle,
          passExpiry: state.passExpiry,
          cost: totalCost,
          recovered: recoveredVal,
          tickets: count,
          target: targetCount,
          movies: [...state.movies]
        });

        state.movies = [];
        saveState();
        render();
        showToast("舊年度已成功封存！", "success");
      });

      exportDataBtn.addEventListener("click", async () => {
        const jsonStr = JSON.stringify(state, null, 2);
        const dateTag = getLocalDateString();
        const fileName = `Insight_Pass_Backup_${dateTag}.json`;
        const blob = new Blob([jsonStr], { type: "application/json" });

        if (navigator.canShare && navigator.canShare({ files: [new File([blob], fileName, { type: "application/json" })] })) {
          try {
            await navigator.share({
              files: [new File([blob], fileName, { type: "application/json" })],
              title: fileName
            });
            showToast("資料已成功分享/匯出", "success");
            return;
          } catch (err) {
            if (err.name === 'AbortError') return;
          }
        }

        try {
          const blobUrl = URL.createObjectURL(blob);
          const downloadAnchor = document.createElement("a");
          downloadAnchor.href = blobUrl;
          downloadAnchor.download = fileName;
          downloadAnchor.rel = "noopener";
          document.body.appendChild(downloadAnchor);
          downloadAnchor.click();
          setTimeout(() => {
            document.body.removeChild(downloadAnchor);
            URL.revokeObjectURL(blobUrl);
          }, 1000);
          showToast("資料已成功匯出", "success");
        } catch (e) {
          try {
            await navigator.clipboard.writeText(jsonStr);
            alert("已將備份 JSON 資料複製至剪貼簿，你可以貼上並儲存為文字檔案。");
          } catch (clipErr) {
            alert("匯出失敗，請檢查瀏覽器設定。");
          }
        }
      });

      importDataBtn.addEventListener("click", () => importFileInput.click());
      importFileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const importedState = JSON.parse(event.target.result);
            
            if (!importedState || typeof importedState !== "object") {
              throw new Error("無效的 JSON 結構");
            }
            if (importedState.movies && !Array.isArray(importedState.movies)) {
              throw new Error("movies 欄位格式不正確");
            }

            state = { ...getDefaultState(), ...importedState };
            saveState();
            applyTheme(state.theme);
            populateSettingsFormFromState();
            updateAddTicketPricePreview();
            render();
            showToast("備份資料已成功匯入！", "success");
          } catch (err) {
            alert(`⚠️ 匯入失敗：${err.message || "檔案損壞或格式不相符"}`);
          }
        };
        reader.readAsText(file);
      });

      resetAllBtn.addEventListener("click", () => {
        if (confirm("⚠️ 警告：確定要刪除所有紀錄及設定嗎？此動作無法復原！")) {
          if (confirm("再次確認：這將會徹底刪除本機的所有觀影資料及封存。")) {
            localStorage.removeItem(CONFIG.storageKey);
            state = getDefaultState();
            saveState();
            applyTheme(state.theme);
            populateSettingsFormFromState();
            render();
            noticeModal.classList.remove("hidden");
            enterMandatorySetup();
            showToast("系統所有紀錄已重設", "info");
          }
        }
      });
    }

    function switchRecordsSubTab(tab) {
      if (tab === "current") {
        recordsTabCurrentBtn.classList.add("active");
        recordsTabArchiveBtn.classList.remove("active");
        recordsCurrentSubView.classList.remove("hidden");
        recordsArchiveSubView.classList.add("hidden");
      } else {
        recordsTabArchiveBtn.classList.add("active");
        recordsTabCurrentBtn.classList.remove("active");
        recordsArchiveSubView.classList.remove("hidden");
        recordsCurrentSubView.classList.add("hidden");
      }
    }

    function openArchivedSeasonDetail(archivedId) {
      const season = state.archivedSeasons.find(a => a.id === archivedId);
      if (!season) return;

      detailSeasonTitleText.textContent = season.title;
      detailSeasonMetaText.textContent = `到期日: ${season.passExpiry} | 總成本: $${season.cost} | 已回收: $${season.recovered} | 換領: ${season.tickets}/${season.target} 張`;

      const arcMovies = season.movies || [];
      detailSeasonMovieList.innerHTML = "";

      if (arcMovies.length === 0) {
        detailSeasonMovieList.innerHTML = `<li style="text-align:center; color: var(--muted); font-size: 0.82rem; padding: 16px;">此封存年度未有詳細觀影紀錄。</li>`;
      } else {
        arcMovies.forEach(item => {
          const li = document.createElement("li");
          li.className = "ticket-card";
          
          const priceVal = item.price !== undefined ? item.price : getTicketUnitPrice();
          const priceDisplay = priceVal.toFixed(1).replace('.0', '');
          const feeTag = item.hasOnlineFee ? ' (網上-$10)' : '';
          const ptsText = item.points > 0 ? ` (${item.points}分換領)` : "";
          const priceTag = ` [$${priceDisplay}${feeTag}]`;
          const titleDisplay = item.name ? escapeHtml(item.name) : "未命名";

          li.innerHTML = `
            <div class="ticket-meta">
              <span class="ticket-title">${titleDisplay}${priceTag}${ptsText}</span>
              <div class="ticket-dates">
                ${item.purchaseTime ? `<div>購買: ${formatDateTimeDisplay(item.purchaseTime)}</div>` : ''}
                ${item.watchTime ? `<div>觀看: ${formatDateTimeDisplay(item.watchTime)}</div>` : ''}
              </div>
            </div>
          `;
          detailSeasonMovieList.appendChild(li);
        });
      }

      recordsArchiveListCard.classList.add("hidden");
      recordsSeasonDetailCard.classList.remove("hidden");
    }

    function setPointMode(mode) {
      currentPointMode = mode;
      chip0.classList.toggle("active", mode === "0");
      chip30.classList.toggle("active", mode === "30");
      chipCustom.classList.toggle("active", mode === "custom");
      customPointsWrap.style.display = mode === "custom" ? "block" : "none";
    }

    function getTotalCost() {
      let passVal = 2000;
      if (state.passCategory === "custom") {
        passVal = parseFloat(state.customPassPrice) || 0;
      } else {
        passVal = parseFloat(state.passCategory) || 2000;
      }
      const memVal = parseFloat(state.memberFeeCategory) || 0;
      return passVal + memVal;
    }

    function render() {
      movieNameGroup.style.display = state.enableMovieName ? "block" : "none";
      movieName.required = state.enableMovieName;
      movieNameLabel.innerHTML = `<svg class="icon icon-stroke" viewBox="0 0 24 24" width="16" height="16"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></svg> ${state.enableMovieName ? "電影名稱 (必填)" : "電影名稱"}`;

      watchDateGroup.style.display = state.enableWatchDate ? "block" : "none";

      const mDays = calcDaysLeft(state.memberExpiry);
      const pDays = calcDaysLeft(state.passExpiry);
      
      memberDateText.textContent = state.memberExpiry.replaceAll("-", " / ");
      formatExpiryDays(memberDaysText, mDays);

      passDateText.textContent = state.passExpiry.replaceAll("-", " / ");
      formatExpiryDays(passDaysText, pDays);

      const totalCost = getTotalCost();
      const unitPrice = getTicketUnitPrice();
      const count = state.movies.length;

      const recoveredVal = state.movies.reduce((sum, item) => sum + (item.price !== undefined ? item.price : unitPrice), 0);
      const remainingCost = Math.max(0, totalCost - recoveredVal);

      const remainingCount = unitPrice > 0 ? Math.ceil(remainingCost / unitPrice) : 0;
      const targetEstimateTotal = unitPrice > 0 ? Math.ceil(totalCost / unitPrice) : 0;

      const pct = totalCost > 0 ? Math.round((recoveredVal / totalCost) * 100) : 0;
      const displayFillPct = Math.min(pct, 100);

      heroProgressValue.textContent = `$${recoveredVal.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 1})} / $${totalCost.toLocaleString()}`;
      
      if (remainingCost <= 0) {
        const profit = recoveredVal - totalCost;
        heroRemainingText.textContent = profit > 0 ? `已成功回本！🎉 (超額 +$${profit.toLocaleString()})` : `已成功回本！🎉`;
      } else {
        heroRemainingText.textContent = `仲差約 ${remainingCount} 張先回本 (仲差 $${remainingCost.toLocaleString()})`;
      }

      heroCountText.textContent = `已記錄 ${count} 張戲飛`;
      heroPercentOverlayText.textContent = `${pct}% 回本`;
      heroTargetEstimateText.textContent = `按目前設定估計需約 ${targetEstimateTotal} 張回本`;
      progressFill.style.width = `${displayFillPct}%`;

      const totalPts = state.movies.reduce((sum, item) => sum + (item.points || 0), 0);
      totalPointsText.textContent = `${totalPts} 分`;

      const todayLocalStr = getLocalDateString();
      const todayCount = state.movies.filter(m => m.purchaseTime && m.purchaseTime.slice(0, 10) === todayLocalStr).length;
      todayText.textContent = `${todayCount} / 3 張`;

      if (todayCount >= 3) {
        dailyLimitWarning.classList.remove("hidden");
      } else {
        dailyLimitWarning.classList.add("hidden");
      }

      homeCurrentCountText.textContent = `共 ${count} 張`;
      const latestFive = [...state.movies].slice(0, 5);
      renderTicketList(homeTicketList, latestFive);

      const archCount = state.archivedSeasons ? state.archivedSeasons.length : 0;
      if (archCount > 0) {
        renderArchiveList(homeArchivedList, state.archivedSeasons.slice(0, 5));
      } else {
        homeArchivedList.innerHTML = `<div style="text-align:center; color: var(--muted); font-size: 0.82rem; padding: 12px; font-weight: 500;">未有過往年度封存紀錄。</div>`;
      }

      recordsFullCountText.textContent = `共 ${count} 張`;
      let sortedFullMovies = [...state.movies];
      if (recordSortOrder === 'oldest') {
        sortedFullMovies.sort((a, b) => (a.purchaseTime || '').localeCompare(b.purchaseTime || ''));
      } else {
        sortedFullMovies.sort((a, b) => (b.purchaseTime || '').localeCompare(a.purchaseTime || ''));
      }
      renderTicketList(recordsFullTicketList, sortedFullMovies);

      if (state.archivedSeasons && state.archivedSeasons.length > 0) {
        renderArchiveList(recordsArchiveFullList, state.archivedSeasons);
      } else {
        recordsArchiveFullList.innerHTML = `<div style="text-align:center; color: var(--muted); font-size: 0.82rem; padding: 16px;">未有過往年度封存紀錄。</div>`;
      }
    }

    function renderTicketList(targetEl, moviesArray) {
      targetEl.innerHTML = "";
      if (!moviesArray || moviesArray.length === 0) {
        targetEl.innerHTML = `<li style="text-align:center; color: var(--muted); font-size: 0.82rem; padding: 16px; font-weight: 500;">未有紀錄，點擊上方按鈕開始加入！</li>`;
        return;
      }

      moviesArray.forEach((item) => {
        const li = document.createElement("li");
        li.className = "swipe-item";
        li.dataset.id = item.id;

        const priceVal = item.price !== undefined ? item.price : getTicketUnitPrice();
        const priceDisplay = priceVal.toFixed(1).replace('.0', '');
        const feeTag = item.hasOnlineFee ? ' (網上-$10)' : '';
        const ptsText = item.points > 0 ? ` (${item.points}分換領)` : "";
        const priceTag = ` [$${priceDisplay}${feeTag}]`;
        const titleDisplay = item.name ? escapeHtml(item.name) : "未命名";

        li.innerHTML = `
          <!-- 左邊滑出：編輯 -->
          <div class="swipe-actions swipe-actions-left">
            <button type="button" class="btn-swipe-edit" onclick="openEditTicketModal('${item.id}')">
              <svg class="icon icon-stroke" viewBox="0 0 24 24" width="18" height="18">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
              <span>編輯</span>
            </button>
          </div>

          <!-- 卡片內容 -->
          <div class="swipe-content">
            <div class="ticket-meta">
              <span class="ticket-title">${titleDisplay}${priceTag}${ptsText}</span>
              <div class="ticket-dates">
                ${item.purchaseTime ? `<div>購買: ${formatDateTimeDisplay(item.purchaseTime)}</div>` : ''}
                ${item.watchTime ? `<div>觀看: ${formatDateTimeDisplay(item.watchTime)}</div>` : ''}
              </div>
            </div>
          </div>

          <!-- 右邊滑出：刪除 -->
          <div class="swipe-actions swipe-actions-right">
            <button type="button" class="btn-swipe-del" onclick="deleteTicket('${item.id}', this)">
              <svg class="icon icon-stroke" viewBox="0 0 24 24" width="18" height="18">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
              <span>刪除</span>
            </button>
          </div>
        `;
        targetEl.appendChild(li);
      });

      bindSwipeGesture(targetEl);
    }

    function bindSwipeGesture(container) {
      container.querySelectorAll('.swipe-item').forEach(item => {
        const content = item.querySelector('.swipe-content');
        const leftAction = item.querySelector('.swipe-actions-left');
        const rightAction = item.querySelector('.swipe-actions-right');
        const maxSwipe = 80;
        let startX = 0;
        let startY = 0;
        let currentTransformX = 0;
        let isDragging = false;
        let isHorizontal = null;

        function closeOtherSwipes() {
          document.querySelectorAll('.swipe-item').forEach(other => {
            if (other !== item) {
              const otherContent = other.querySelector('.swipe-content');
              if (otherContent) {
                otherContent.style.transition = 'transform 0.25s cubic-bezier(0.25, 1, 0.5, 1)';
                otherContent.style.transform = 'translateX(0px)';
              }
              const otherLeft = other.querySelector('.swipe-actions-left');
              const otherRight = other.querySelector('.swipe-actions-right');
              if (otherLeft) { otherLeft.style.opacity = '0'; otherLeft.style.visibility = 'hidden'; }
              if (otherRight) { otherRight.style.opacity = '0'; otherRight.style.visibility = 'hidden'; }
            }
          });
        }

        function updateActionVisibility(x) {
          if (x > 0) {
            if (leftAction) { leftAction.style.opacity = '1'; leftAction.style.visibility = 'visible'; }
            if (rightAction) { rightAction.style.opacity = '0'; rightAction.style.visibility = 'hidden'; }
          } else if (x < 0) {
            if (rightAction) { rightAction.style.opacity = '1'; rightAction.style.visibility = 'visible'; }
            if (leftAction) { leftAction.style.opacity = '0'; leftAction.style.visibility = 'hidden'; }
          } else {
            if (leftAction) { leftAction.style.opacity = '0'; leftAction.style.visibility = 'hidden'; }
            if (rightAction) { rightAction.style.opacity = '0'; rightAction.style.visibility = 'hidden'; }
          }
        }

        content.addEventListener('touchstart', (e) => {
          closeOtherSwipes();
          startX = e.touches[0].clientX;
          startY = e.touches[0].clientY;
          const matrix = new WebKitCSSMatrix(window.getComputedStyle(content).transform);
          currentTransformX = matrix.m41;
          content.style.transition = 'none';
          isHorizontal = null;
          isDragging = true;
        }, { passive: true });

        content.addEventListener('touchmove', (e) => {
          if (!isDragging) return;
          const touchX = e.touches[0].clientX;
          const touchY = e.touches[0].clientY;
          const deltaX = touchX - startX;
          const deltaY = touchY - startY;

          if (isHorizontal === null) {
            if (Math.abs(deltaX) > 6 || Math.abs(deltaY) > 6) {
              isHorizontal = Math.abs(deltaX) > Math.abs(deltaY);
            }
          }

          if (isHorizontal) {
            let moveX = currentTransformX + deltaX;
            if (moveX < -maxSwipe - 15) moveX = -maxSwipe - 15;
            if (moveX > maxSwipe + 15) moveX = maxSwipe + 15;
            content.style.transform = `translateX(${moveX}px)`;
            updateActionVisibility(moveX);
          }
        }, { passive: true });

        content.addEventListener('touchend', () => {
          if (!isDragging) return;
          isDragging = false;
          content.style.transition = 'transform 0.25s cubic-bezier(0.25, 1, 0.5, 1)';
          const matrix = new WebKitCSSMatrix(window.getComputedStyle(content).transform);
          const finalX = matrix.m41;

          if (finalX < -maxSwipe / 2) {
            content.style.transform = `translateX(-${maxSwipe}px)`;
            updateActionVisibility(-maxSwipe);
          } else if (finalX > maxSwipe / 2) {
            content.style.transform = `translateX(${maxSwipe}px)`;
            updateActionVisibility(maxSwipe);
          } else {
            content.style.transform = 'translateX(0px)';
            updateActionVisibility(0);
          }
        });

        content.addEventListener('mousedown', (e) => {
          closeOtherSwipes();
          startX = e.clientX;
          const matrix = new WebKitCSSMatrix(window.getComputedStyle(content).transform);
          currentTransformX = matrix.m41;
          content.style.transition = 'none';
          isDragging = true;

          function onMouseMove(moveEvent) {
            if (!isDragging) return;
            const deltaX = moveEvent.clientX - startX;
            let moveX = currentTransformX + deltaX;
            if (moveX < -maxSwipe - 15) moveX = -maxSwipe - 15;
            if (moveX > maxSwipe + 15) moveX = maxSwipe + 15;
            content.style.transform = `translateX(${moveX}px)`;
            updateActionVisibility(moveX);
          }

          function onMouseUp() {
            isDragging = false;
            content.style.transition = 'transform 0.25s cubic-bezier(0.25, 1, 0.5, 1)';
            const matrix = new WebKitCSSMatrix(window.getComputedStyle(content).transform);
            const finalX = matrix.m41;

            if (finalX < -maxSwipe / 2) {
              content.style.transform = `translateX(-${maxSwipe}px)`;
              updateActionVisibility(-maxSwipe);
            } else if (finalX > maxSwipe / 2) {
              content.style.transform = `translateX(${maxSwipe}px)`;
              updateActionVisibility(maxSwipe);
            } else {
              content.style.transform = 'translateX(0px)';
              updateActionVisibility(0);
            }
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
          }

          window.addEventListener('mousemove', onMouseMove);
          window.addEventListener('mouseup', onMouseUp);
        });
      });
    }

    function renderArchiveList(targetEl, archiveArray) {
      targetEl.innerHTML = "";
      if (!archiveArray || archiveArray.length === 0) return;

      targetEl.innerHTML = archiveArray.map(a => {
        const pct = a.cost > 0 ? Math.round((a.recovered / a.cost) * 100) : 0;
        return `
          <div class="archive-card-item" onclick="handleArchiveCardClick('${a.id}')">
            <div style="display:flex; justify-content:space-between; font-weight:700; color:var(--text); font-size:0.88rem;">
              <span>${escapeHtml(a.title)}</span>
              <span>${a.tickets} / ${a.target} 張 (${pct}%)</span>
            </div>
            <div style="color:var(--muted); font-size:0.75rem; margin-top:4px;">
              到期日: ${a.passExpiry} | 回收金額: $${a.recovered.toFixed(1).replace('.0', '')} / $${a.cost}
            </div>
          </div>
        `;
      }).join("");
    }

    function handleArchiveCardClick(archivedId) {
      switchView("view-records");
      switchRecordsSubTab("archive");
      openArchivedSeasonDetail(archivedId);
    }

    function deleteTicket(id, btnElement) {
      const confirmed = confirm("確定要刪除這張戲飛紀錄嗎？刪除後數據將重新計算。");
      if (confirmed) {
        state.movies = state.movies.filter(m => m.id !== id);
        saveState();
        render();
        showToast("已刪除該戲飛紀錄", "error");
      } else {
        closeAllSwipes();
      }
    }

    function calcDaysLeft(dateStr) {
      if (!dateStr) return 0;
      const target = new Date(dateStr);
      const today = new Date();
      target.setHours(23, 59, 59, 999);
      today.setHours(0, 0, 0, 0);
      const diffMs = target.getTime() - today.getTime();
      return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    }

    function formatExpiryDays(element, days) {
      element.className = "expiry-days";
      if (days < 0) {
        element.classList.add("expired");
        element.textContent = `已過期 ${Math.abs(days)} 日`;
      } else if (days <= 7) {
        element.classList.add("warn");
        element.textContent = `⚠️ 仲有 ${days} 日`;
      } else {
        element.textContent = `仲有 ${days} 日`;
      }
    }

    function escapeHtml(str) {
      return str.replace(/[&<>"']/g, (m) => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
      }[m]));
    }