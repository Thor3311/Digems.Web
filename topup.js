document.addEventListener('DOMContentLoaded', function() {
        // Handle nominal selection
        document.querySelectorAll('.nominal-option').forEach(option => {
            option.addEventListener('click', function() {
                // Remove selected class from all options
                document.querySelectorAll('.nominal-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                
                // Add selected class to clicked option
                this.classList.add('selected');
                
                // Update price display
                const value = this.getAttribute('data-value');
                const price = value * 1000; // Assuming 1 diamond = Rp 1000
                document.getElementById('price-display').textContent = `Rp ${price.toLocaleString('id-ID')}`;
            });
        });
        
        // Handle form submission
        document.getElementById('topupForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const game = document.getElementById('game').value;
            const userId = document.getElementById('user-id').value;
            const selectedNominal = document.querySelector('.nominal-option.selected');
            
            if (!game) {
                alert('Silakan pilih game!');
                return;
            }
            
            if (!userId) {
                alert('Silakan masukkan User ID!');
                return;
            }
            
            if (!selectedNominal) {
                alert('Silakan pilih nominal!');
                return;
            }
            
            const nominal = selectedNominal.getAttribute('data-value');
            const price = document.getElementById('price-display').textContent;
            
            // In a real application, you would send this data to a server
            alert(`Top up berhasil diproses!\n\nGame: ${game}\nUser ID: ${userId}\nNominal: ${nominal} Diamond\nHarga: ${price}`);
            
            // Reset form
            this.reset();
            document.querySelectorAll('.nominal-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            document.getElementById('price-display').textContent = 'Rp 0';
        });
    });
