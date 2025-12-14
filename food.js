// 西安美食页面交互功能
document.addEventListener('DOMContentLoaded', function() {
    // 1. 收藏美食功能
    const favoriteButtons = document.querySelectorAll('.add-to-favorite');
    
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const foodCard = this.closest('.food-card');
            const foodTitle = foodCard.querySelector('.food-title').textContent;
            
            // 切换按钮状态
            const icon = this.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                this.style.color = '#D2691E';
                this.style.borderColor = '#D2691E';
                
                // 显示成功消息
                showMessage(`已将"${foodTitle}"加入收藏`, 'success');
                
                // 保存到本地存储
                saveToFavorites(foodTitle);
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                this.style.color = '';
                this.style.borderColor = '';
                
                // 显示移除消息
                showMessage(`已将"${foodTitle}"从收藏中移除`, 'info');
                
                // 从本地存储移除
                removeFromFavorites(foodTitle);
            }
        });
    });
    
    // 本地存储函数
    function saveToFavorites(foodName) {
        let favorites = JSON.parse(localStorage.getItem('xianFoodFavorites')) || [];
        if (!favorites.includes(foodName)) {
            favorites.push(foodName);
            localStorage.setItem('xianFoodFavorites', JSON.stringify(favorites));
        }
    }
    
    function removeFromFavorites(foodName) {
        let favorites = JSON.parse(localStorage.getItem('xianFoodFavorites')) || [];
        favorites = favorites.filter(food => food !== foodName);
        localStorage.setItem('xianFoodFavorites', JSON.stringify(favorites));
    }
    
    // 页面加载时检查收藏状态
    function checkFavorites() {
        const favorites = JSON.parse(localStorage.getItem('xianFoodFavorites')) || [];
        favoriteButtons.forEach(button => {
            const foodCard = button.closest('.food-card');
            const foodTitle = foodCard.querySelector('.food-title').textContent;
            
            if (favorites.includes(foodTitle)) {
                const icon = button.querySelector('i');
                icon.classList.remove('far');
                icon.classList.add('fas');
                button.style.color = '#D2691E';
                button.style.borderColor = '#D2691E';
            }
        });
    }
    
    // 页面加载时检查收藏
    checkFavorites();
    
    // 2. 查看食谱功能
    const recipeButtons = document.querySelectorAll('.view-recipe');
    const recipeModal = document.getElementById('recipe-modal');
    const recipeModalClose = recipeModal.querySelector('.modal-close');
    const recipeBody = document.getElementById('recipe-body');
    
    // 食谱数据
    const recipes = {
        'yangrou-paomo': {
            title: '羊肉泡馍',
            image: 'images/羊肉泡馍1.jpg',
            description: '羊肉泡馍是西安最具代表性的美食之一，汤鲜肉烂，馍筋道入味。',
            ingredients: [
                '羊腿肉 500g',
                '白吉馍 4个',
                '粉丝 50g',
                '木耳 20g',
                '黄花菜 20g',
                '葱、姜、八角、桂皮、香叶适量',
                '盐、胡椒粉、花椒粉适量',
                '香菜、蒜苗适量'
            ],
            steps: [
                '将羊肉洗净切块，冷水下锅焯水，捞出洗净',
                '锅中加水，放入羊肉、葱、姜、八角、桂皮、香叶，大火烧开转小火炖1.5小时',
                '将白吉馍掰成小块（黄豆大小最佳）',
                '木耳、黄花菜泡发，粉丝泡软',
                '将掰好的馍放入碗中，加入粉丝、木耳、黄花菜',
                '舀入炖好的羊肉和热汤，撒上香菜、蒜苗',
                '根据个人口味加入盐、胡椒粉、花椒粉调味'
            ],
            tips: [
                '掰馍要掰得小一些，这样更容易入味',
                '羊肉要炖得酥烂，汤要浓郁',
                '可以根据个人口味加入辣椒油'
            ],
            time: '准备时间：30分钟 | 烹饪时间：2小时',
            difficulty: '中等'
        },
        'roujiamo': {
            title: '肉夹馍',
            image: 'images/肉夹馍1.jpg',
            description: '肉夹馍被称为"中国的汉堡包"，肉香馍脆，回味无穷。',
            ingredients: [
                '五花肉 500g',
                '白吉馍 4个',
                '葱、姜、八角、桂皮、香叶、草果适量',
                '生抽、老抽、料酒、冰糖适量',
                '青椒 1个',
                '香菜适量'
            ],
            steps: [
                '五花肉洗净切大块，冷水下锅焯水',
                '锅中放少量油，加入冰糖炒糖色',
                '放入五花肉翻炒上色',
                '加入葱、姜、八角、桂皮、香叶、草果等香料',
                '加入生抽、老抽、料酒，加水没过肉',
                '大火烧开转小火炖1.5-2小时',
                '将炖好的肉捞出剁碎，可以加入青椒一起剁',
                '白吉馍横切开，不要切断',
                '将剁好的肉夹入馍中，淋上少许肉汁'
            ],
            tips: [
                '肉要炖得酥烂，入口即化',
                '剁肉时可以加入青椒解腻',
                '白吉馍要外脆内软'
            ],
            time: '准备时间：20分钟 | 烹饪时间：2小时',
            difficulty: '简单'
        },
        'liangpi': {
            title: '凉皮',
            image: 'images/凉皮1.jpg',
            description: '凉皮是西安夏季最受欢迎的小吃，酸辣爽口，开胃解暑。',
            ingredients: [
                '高筋面粉 500g',
                '黄瓜 1根',
                '豆芽 100g',
                '面筋 100g',
                '蒜、芝麻酱、辣椒油、醋、生抽适量',
                '盐、糖、香油适量'
            ],
            steps: [
                '面粉加水和成面团，醒发30分钟',
                '将面团放入清水中揉搓，洗出面筋',
                '洗出的淀粉水静置4-6小时，倒去上层清水',
                '面筋上锅蒸20分钟，切块备用',
                '平底盘中刷油，倒入淀粉水，摇匀',
                '放入沸水锅中蒸2-3分钟，取出晾凉',
                '揭下凉皮，切成条状',
                '黄瓜切丝，豆芽焯水',
                '将凉皮、面筋、黄瓜丝、豆芽放入碗中',
                '加入蒜水、芝麻酱、辣椒油、醋、生抽、盐、糖、香油拌匀'
            ],
            tips: [
                '洗面要有耐心，直到水变清',
                '淀粉水要静置足够时间',
                '调料可以根据个人口味调整'
            ],
            time: '准备时间：6小时 | 烹饪时间：30分钟',
            difficulty: '较难'
        }
    };
    
    // 打开食谱模态框
    function openRecipeModal(recipeId) {
        const recipe = recipes[recipeId];
        if (!recipe) {
            showMessage('食谱信息暂未提供', 'info');
            return;
        }
        
        // 构建模态框内容
        let recipeContent = `
            <div class="modal-recipe">
                <div class="recipe-header">
                    <h2>${recipe.title} - 家庭做法</h2>
                    <div class="recipe-meta">
                        <span><i class="fas fa-clock"></i> ${recipe.time}</span>
                        <span><i class="fas fa-chart-line"></i> 难度：${recipe.difficulty}</span>
                    </div>
                </div>
                <div class="recipe-image">
                    <img src="${recipe.image}" alt="${recipe.title}">
                </div>
                <div class="recipe-section">
                    <h3><i class="fas fa-info-circle"></i> 菜品介绍</h3>
                    <p>${recipe.description}</p>
                </div>
                <div class="recipe-section">
                    <h3><i class="fas fa-shopping-basket"></i> 所需食材</h3>
                    <ul>
                        ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                    </ul>
                </div>
                <div class="recipe-section">
                    <h3><i class="fas fa-list-ol"></i> 制作步骤</h3>
                    <ol>
                        ${recipe.steps.map((step, index) => `<li>${step}</li>`).join('')}
                    </ol>
                </div>
                <div class="recipe-section">
                    <h3><i class="fas fa-lightbulb"></i> 小贴士</h3>
                    <ul class="tips">
                        ${recipe.tips.map(tip => `<li>${tip}</li>`).join('')}
                    </ul>
                </div>
                <div class="recipe-footer">
                    <button class="btn-outline print-recipe"><i class="fas fa-print"></i> 打印食谱</button>
                </div>
            </div>
        `;
        
        recipeBody.innerHTML = recipeContent;
        recipeModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // 添加打印功能
        const printBtn = document.querySelector('.print-recipe');
        if (printBtn) {
            printBtn.addEventListener('click', function() {
                window.print();
            });
        }
    }
    
    // 为食谱按钮添加点击事件
    recipeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const recipeId = this.getAttribute('data-target');
            openRecipeModal(recipeId);
        });
    });
    
    // 关闭食谱模态框
    recipeModalClose.addEventListener('click', function() {
        recipeModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    recipeModal.addEventListener('click', function(e) {
        if (e.target === recipeModal) {
            recipeModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // 3. 推荐餐馆功能
    const restaurantButtons = document.querySelectorAll('.find-restaurant');
    const restaurantModal = document.getElementById('restaurant-modal');
    const restaurantModalClose = restaurantModal.querySelector('.modal-close');
    const restaurantBody = document.getElementById('restaurant-body');
    
    // 餐馆数据
    const restaurants = {
        '羊肉泡馍': [
            {
                name: '老孙家饭庄',
                address: '西安市东大街364号',
                rating: 4.7,
                price: '¥35-60',
                feature: '百年老店，最正宗的羊肉泡馍',
                hours: '10:00-21:30'
            },
            {
                name: '同盛祥饭庄',
                address: '西安市钟鼓楼广场',
                rating: 4.6,
                price: '¥30-55',
                feature: '中华老字号，非物质文化遗产',
                hours: '10:30-22:00'
            },
            {
                name: '米家泡馍',
                address: '西安市洒金桥129号',
                rating: 4.8,
                price: '¥25-40',
                feature: '本地人最爱，味道正宗',
                hours: '9:00-20:30'
            }
        ],
        '肉夹馍': [
            {
                name: '樊记腊汁肉夹馍',
                address: '西安市竹笆市街53号',
                rating: 4.9,
                price: '¥10-15',
                feature: '百年老店，腊汁肉香醇',
                hours: '8:00-20:00'
            },
            {
                name: '秦豫肉夹馍',
                address: '西安市东木头市19号',
                rating: 4.7,
                price: '¥8-12',
                feature: '馍脆肉香，肥而不腻',
                hours: '7:30-19:30'
            },
            {
                name: '子午路张记肉夹馍',
                address: '西安市雁塔区翠华路',
                rating: 4.8,
                price: '¥9-14',
                feature: '连锁品牌，品质稳定',
                hours: '8:00-21:00'
            }
        ],
        '凉皮': [
            {
                name: '魏家凉皮',
                address: '西安市多家分店',
                rating: 4.6,
                price: '¥8-15',
                feature: '连锁品牌，干净卫生',
                hours: '8:00-22:00'
            },
            {
                name: '朱选民大米面皮',
                address: '西安市西木头市',
                rating: 4.8,
                price: '¥10-18',
                feature: '大米面皮，口感独特',
                hours: '9:00-20:00'
            },
            {
                name: '云老四凉皮',
                address: '西安市金康路红花巷',
                rating: 4.7,
                price: '¥7-12',
                feature: '老字号，辣椒油香',
                hours: '9:30-20:30'
            }
        ]
    };
    
    // 打开餐馆推荐模态框
    function openRestaurantModal(foodName) {
        const foodRestaurants = restaurants[foodName];
        if (!foodRestaurants) {
            showMessage(`暂无"${foodName}"的餐馆推荐`, 'info');
            return;
        }
        
        // 构建模态框内容
        let restaurantContent = `
            <div class="modal-restaurant">
                <div class="restaurant-header">
                    <h2>${foodName} - 推荐餐馆</h2>
                    <p>以下是一些口碑较好的餐馆，供您参考</p>
                </div>
                <div class="restaurant-list">
        `;
        
        foodRestaurants.forEach((restaurant, index) => {
            restaurantContent += `
                <div class="restaurant-item">
                    <div class="restaurant-rank">
                        <span class="rank-number">${index + 1}</span>
                    </div>
                    <div class="restaurant-info">
                        <h3>${restaurant.name}</h3>
                        <div class="restaurant-rating">
                            <div class="stars">
                                ${'<i class="fas fa-star"></i>'.repeat(Math.floor(restaurant.rating))}
                                ${restaurant.rating % 1 !== 0 ? '<i class="fas fa-star-half-alt"></i>' : ''}
                            </div>
                            <span class="rating-score">${restaurant.rating}</span>
                        </div>
                        <div class="restaurant-details">
                            <p><i class="fas fa-map-marker-alt"></i> ${restaurant.address}</p>
                            <p><i class="fas fa-clock"></i> 营业时间：${restaurant.hours}</p>
                            <p><i class="fas fa-tag"></i> 人均消费：${restaurant.price}</p>
                            <p><i class="fas fa-star"></i> 特色：${restaurant.feature}</p>
                        </div>
                    </div>
                </div>
            `;
        });
        
        restaurantContent += `
                </div>
                <div class="restaurant-tips">
                    <h3><i class="fas fa-lightbulb"></i> 用餐建议</h3>
                    <ul>
                        <li>建议避开用餐高峰期（12:00-13:00，18:00-19:00）</li>
                        <li>部分老字号餐馆可能需要排队等候</li>
                        <li>可以尝试多家餐馆，比较不同风味</li>
                        <li>注意餐馆的营业时间，有些餐馆下午会休息</li>
                    </ul>
                </div>
            </div>
        `;
        
        restaurantBody.innerHTML = restaurantContent;
        restaurantModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    // 为餐馆按钮添加点击事件
    restaurantButtons.forEach(button => {
        button.addEventListener('click', function() {
            const foodName = this.getAttribute('data-food');
            openRestaurantModal(foodName);
        });
    });
    
    // 关闭餐馆模态框
    restaurantModalClose.addEventListener('click', function() {
        restaurantModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    restaurantModal.addEventListener('click', function(e) {
        if (e.target === restaurantModal) {
            restaurantModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // 4. 美食筛选功能（如果页面有筛选选项）
    const foodCards = document.querySelectorAll('.food-card');
    const filterOptions = document.querySelectorAll('.filter-option');
    
    // 如果有筛选选项，添加事件监听
    if (filterOptions.length > 0) {
        filterOptions.forEach(option => {
            option.addEventListener('click', function() {
                const filterType = this.getAttribute('data-filter');
                const filterValue = this.getAttribute('data-value');
                
                filterOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
                
                foodCards.forEach(card => {
                    if (filterValue === 'all') {
                        card.style.display = 'grid';
                    } else if (card.getAttribute(`data-${filterType}`) === filterValue) {
                        card.style.display = 'grid';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
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
    }
    
    // 6. 页面加载动画
    window.addEventListener('load', function() {
        // 美食卡片动画
        const foodCards = document.querySelectorAll('.food-card');
        foodCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 + index * 100);
        });
        
        // 文化卡片动画
        const cultureCards = document.querySelectorAll('.culture-card');
        cultureCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 300 + index * 100);
        });
        
        // 节庆卡片动画
        const festivalCards = document.querySelectorAll('.festival-card');
        festivalCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 500 + index * 100);
        });
    });
    
    // 7. 按ESC键关闭模态框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (recipeModal.style.display === 'flex') {
                recipeModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
            if (restaurantModal.style.display === 'flex') {
                restaurantModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
    });
});