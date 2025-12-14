// 西安景点页面交互功能
document.addEventListener('DOMContentLoaded', function() {
    // 1. 景点筛选功能
    const filterTags = document.querySelectorAll('.filter-tag');
    const scenicItems = document.querySelectorAll('.scenic-item');
    
    filterTags.forEach(tag => {
        tag.addEventListener('click', function() {
            // 更新活动标签
            filterTags.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // 筛选景点
            scenicItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'grid';
                } else if (item.classList.contains(filterValue)) {
                    item.style.display = 'grid';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // 2. 搜索功能
    const searchInput = document.getElementById('scenic-search');
    const searchBtn = document.getElementById('search-btn');
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            // 如果没有搜索词，显示所有景点
            scenicItems.forEach(item => {
                item.style.display = 'grid';
            });
            return;
        }
        
        scenicItems.forEach(item => {
            const scenicName = item.getAttribute('data-name').toLowerCase();
            const scenicDesc = item.querySelector('.scenic-desc').textContent.toLowerCase();
            
            if (scenicName.includes(searchTerm) || scenicDesc.includes(searchTerm)) {
                item.style.display = 'grid';
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // 3. 加入行程功能
    const addToPlanButtons = document.querySelectorAll('.add-to-plan');
    
    addToPlanButtons.forEach(button => {
        button.addEventListener('click', function() {
            const scenicItem = this.closest('.scenic-item');
            const scenicTitle = scenicItem.querySelector('.scenic-title').textContent;
            
            // 切换按钮状态
            const icon = this.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                this.style.color = '#D2691E';
                this.style.borderColor = '#D2691E';
                
                // 显示成功消息
                showMessage(`已将"${scenicTitle}"加入行程计划`, 'success');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                this.style.color = '';
                this.style.borderColor = '';
                
                // 显示移除消息
                showMessage(`已将"${scenicTitle}"从行程计划中移除`, 'info');
            }
        });
    });
    
    // 4. 景点详情模态框
    const detailButtons = document.querySelectorAll('.scenic-detail');
    const modalOverlay = document.getElementById('detail-modal');
    const modalClose = document.querySelector('.modal-close');
    const modalBody = document.getElementById('modal-body');
    const mapPoints = document.querySelectorAll('.map-point');
    
    // 景点详情数据
    const scenicDetails = {
        'terracotta-army': {
            title: '秦始皇兵马俑',
            image: 'https://images.unsplash.com/photo-1559767949-0faa5c7e5d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            description: '秦始皇兵马俑是世界第八大奇迹，位于陕西省西安市临潼区秦始皇陵以东1.5公里处。兵马俑是古代墓葬雕塑的一个类别，是制成兵马（战车、战马、士兵）形状的殉葬品。',
            history: '秦始皇陵建于公元前246年至公元前208年，历时39年。兵马俑坑是秦始皇陵的陪葬坑，1974年被当地农民打井时发现。',
            features: [
                '三个坑共出土陶俑、陶马约8000件',
                '陶俑按秦军编制排列，包括将军、军吏、武士等',
                '兵器为实战兵器，包括青铜剑、矛、戈、弩等',
                '铜车马制作工艺精湛，被誉为"青铜之冠"'
            ],
            tips: [
                '建议早上去，避开人流高峰',
                '请导游讲解能更好了解历史背景',
                '禁止使用闪光灯拍照',
                '预留足够时间参观三个坑和铜车马展厅'
            ]
        },
        'big-wild-goose-pagoda': {
            title: '大雁塔',
            image: 'https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            description: '大雁塔位于陕西省西安市雁塔区大慈恩寺内，是唐代楼阁式砖塔的典范。塔高64.5米，共七层，呈方形锥体。',
            history: '大雁塔建于唐永徽三年（652年），由玄奘法师为保存从印度带回的佛经、佛像而主持修建。最初为五层，后加盖至九层，再后层数和高度有所变化，最后固定为七层。',
            features: [
                '唐代楼阁式砖塔的典型代表',
                '塔内有楼梯可登顶俯瞰西安城',
                '塔内保存有唐代线刻佛像和碑刻',
                '大慈恩寺是唐代皇家寺院'
            ],
            tips: [
                '登塔需另外购票',
                '晚上有音乐喷泉表演',
                '附近有大唐不夜城可一同游览',
                '塔北广场有玄奘法师铜像'
            ]
        },
        'city-wall': {
            title: '西安古城墙',
            image: 'https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            description: '西安城墙是中国现存规模最大、保存最完整的古代城垣。城墙周长13.74公里，高12米，顶宽12-14米，底宽15-18米。',
            history: '西安城墙建于明洪武七年至十一年（1374-1378年），是在唐代皇城基础上扩建而成。明代初年在隋唐皇城的基础上扩建，明清时期多次修葺。',
            features: [
                '中国现存最完整的古代城垣',
                '设有四座主城门和众多敌楼、角楼',
                '可步行、骑自行车或乘坐电瓶车游览',
                '夜间有灯光秀和表演'
            ],
            tips: [
                '建议骑自行车环游城墙',
                '南门(永宁门)最宏伟，适合拍照',
                '傍晚时分可欣赏日落和夜景',
                '城墙上有租借自行车和电瓶车服务'
            ]
        },
        'bell-drum-tower': {
            title: '钟鼓楼',
            image: 'https://images.unsplash.com/photo-1544463024-1d3b3fe2f064?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            description: '钟楼和鼓楼位于西安市中心，是明代建筑的典型代表。钟楼建于1384年，高36米；鼓楼建于1380年，高34米。',
            history: '钟鼓楼始建于明洪武年间，是古代西安城的报时中心。钟楼原址在今西大街广济街口，明万历十年（1582年）迁于现址。鼓楼是现存中国古代鼓楼中规模最大、保存最完整的鼓楼之一。',
            features: [
                '西安城市中心地标建筑',
                '钟楼内陈列有明代铁钟和景云钟',
                '鼓楼内有二十四节气鼓和古代计时仪器',
                '鼓乐表演定时举行'
            ],
            tips: [
                '购买联票更划算',
                '登楼可俯瞰西安市中心全景',
                '晚上灯光效果更佳',
                '附近有回民街可品尝美食'
            ]
        },
        'huaqing-palace': {
            title: '华清宫',
            image: 'https://images.unsplash.com/photo-1598239236247-c6c0138a5a06?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            description: '华清宫位于西安市临潼区骊山北麓，是中国古代皇家温泉园林，有着3000年的皇家园林史和6000年的温泉利用史。',
            history: '华清宫历史悠久，周、秦、汉、隋、唐等历代帝王在此修建离宫别苑。因唐玄宗和杨贵妃的爱情故事而闻名，也是"西安事变"的发生地。现今的华清宫是在唐代华清宫遗址上重建的。',
            features: [
                '唐代皇家温泉园林',
                '骊山温泉水质优良，富含矿物质',
                '大型实景历史舞剧《长恨歌》',
                '西安事变旧址五间厅'
            ],
            tips: [
                '可体验骊山温泉',
                '建议观看《长恨歌》演出',
                '与兵马俑安排在同一天游览',
                '骊山索道可登顶俯瞰华清宫全景'
            ]
        }
    };
    
    // 打开模态框函数
    function openModal(scenicId) {
        const detail = scenicDetails[scenicId];
        if (!detail) return;
        
        // 构建模态框内容
        let modalContent = `
            <div class="modal-scenic">
                <div class="modal-header">
                    <h2>${detail.title}</h2>
                </div>
                <div class="modal-image">
                    <img src="${detail.image}" alt="${detail.title}">
                </div>
                <div class="modal-section">
                    <h3><i class="fas fa-info-circle"></i> 景点介绍</h3>
                    <p>${detail.description}</p>
                </div>
                <div class="modal-section">
                    <h3><i class="fas fa-history"></i> 历史背景</h3>
                    <p>${detail.history}</p>
                </div>
                <div class="modal-section">
                    <h3><i class="fas fa-star"></i> 主要特色</h3>
                    <ul>
                        ${detail.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                    </ul>
                </div>
                <div class="modal-section">
                    <h3><i class="fas fa-lightbulb"></i> 游览贴士</h3>
                    <ul>
                        ${detail.tips.map(tip => `<li><i class="fas fa-exclamation-circle"></i> ${tip}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
        
        modalBody.innerHTML = modalContent;
        modalOverlay.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // 防止背景滚动
    }
    
    // 为详情按钮添加点击事件
    detailButtons.forEach(button => {
        button.addEventListener('click', function() {
            const scenicId = this.getAttribute('data-target');
            openModal(scenicId);
        });
    });
    
    // 为地图点添加点击事件
    mapPoints.forEach(point => {
        point.addEventListener('click', function() {
            const scenicId = this.getAttribute('data-target');
            openModal(scenicId);
        });
    });
    
    // 关闭模态框
    modalClose.addEventListener('click', function() {
        modalOverlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            modalOverlay.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // 按ESC键关闭模态框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOverlay.style.display === 'flex') {
            modalOverlay.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // 5. 显示消息函数
    function showMessage(message, type) {
        // 检查是否已存在消息框
        const existingMessage = document.querySelector('.message-box');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // 创建消息框
        const messageBox = document.createElement('div');
        messageBox.className = `message-box ${type}`;
        messageBox.innerHTML = `
            <div class="message-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="message-close"><i class="fas fa-times"></i></button>
        `;
        
        document.body.appendChild(messageBox);
        
        // 添加样式
        const style = document.createElement('style');
        style.textContent = `
            .message-box {
                position: fixed;
                top: 20px;
                right: 20px;
                background-color: white;
                border-radius: 8px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 15px 20px;
                z-index: 3000;
                min-width: 300px;
                max-width: 400px;
                border-left: 5px solid #D2691E;
                animation: slideIn 0.3s ease-out;
            }
            
            .message-box.success {
                border-left-color: #388E3C;
            }
            
            .message-box.info {
                border-left-color: #1976D2;
            }
            
            .message-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .message-content i {
                font-size: 1.5rem;
            }
            
            .message-box.success .message-content i {
                color: #388E3C;
            }
            
            .message-box.info .message-content i {
                color: #1976D2;
            }
            
            .message-close {
                background: none;
                border: none;
                color: #8B4513;
                cursor: pointer;
                font-size: 1.2rem;
                margin-left: 15px;
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        
        document.head.appendChild(style);
        
        // 关闭按钮事件
        const closeBtn = messageBox.querySelector('.message-close');
        closeBtn.addEventListener('click', function() {
            messageBox.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                messageBox.remove();
                style.remove();
            }, 300);
        });
        
        // 自动消失
        setTimeout(() => {
            if (messageBox.parentNode) {
                messageBox.style.animation = 'slideOut 0.3s ease-out';
                setTimeout(() => {
                    messageBox.remove();
                    style.remove();
                }, 300);
            }
        }, 5000);
        
        // 添加消失动画
        const slideOutStyle = document.createElement('style');
        slideOutStyle.textContent = `
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(slideOutStyle);
    }
    
    // 6. 页面加载动画
    window.addEventListener('load', function() {
        // 景点项动画
        const scenicItems = document.querySelectorAll('.scenic-item');
        scenicItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100 + index * 100);
        });
        
        // 贴士卡片动画
        const tipCards = document.querySelectorAll('.tip-card');
        tipCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 300 + index * 100);
        });
    });
});