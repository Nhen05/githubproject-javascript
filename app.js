document.addEventListener('DOMContentLoaded', function () {
    Swal.fire({
        title: "👋 Xin chào bạn!",
        html: `
      <p>Đây là ứng dụng <b>tìm kiếm người dùng GitHub</b> đơn giản.</p>
      <p>Phát triển bởi <b>Nhen Dev</b> – Sinh viên năm 2 Cao đẳng Bách Khoa Tây Nguyên.</p>
      <p>Ngôn ngữ sử dụng: <b>HTML, CSS, JavaScript (Vanilla)</b>.</p>
    `,
        width: 600,
        padding: "2em",
        color: "#333",
        background: "#fff url('/images/trees.png')",
        backdrop: `
      rgba(0,0,0,0.4)
      url("/images/nyan-cat.gif")
      left top
      no-repeat
    `
    });

    const btnFind = document.getElementById('find-btn');
    const profile = document.getElementById('profile');
    btnFind.addEventListener('click', async function (e) {
        const userInput = document.getElementById('userName');
        const userName = userInput.value.trim();
        const loaders = document.getElementById('loaders');
        e.preventDefault();
        if (userName === '') {
            Swal.fire({
                icon: "error",
                title: "invalid",
                text: "Vui Lòng Nhập Tên Người Dùng !",
            });
            return;
        } else {
            loaders.style.display = 'inline-block';
            try {
                const respone = await fetch(`https://api.github.com/users/${userName}`);
                if (!respone.ok) {
                    Swal.fire({
                        title: "Not Found?",
                        text: "Không Tìm Thấy Người Dùng ?",
                        icon: "question"
                    });
                }
                const data = await respone.json();
                renderProfile(data);
                userInput.value = '';
                userInput.focus();
            }
            catch (err) {
                console.log('Lỗi', err)
                alert(err.message)
            }
            finally {
                loaders.style.display = 'none';

            }
        }
    }
    );
    function renderProfile(data) {
        let html = `
          <div class="card-body p-4">
     <div class="d-flex">
        <div class="flex-shrink-0">
           <img src="${data.avatar_url}"
              alt="Generic placeholder image" class="img-fluid"
              style="width: 180px; border-radius: 10px;">
        </div>
        <div class="flex-grow-1 ms-3">
           <h5 class="mb-1">${data.login}</h5>
           <p class="mb-2 pb-1">${data.name}</p>
           <div
              class="d-flex justify-content-start rounded-3 p-2 mb-2 bg-body-tertiary">
              <div>
                 <p class="small text-muted mb-1">public_repos</p>
                 <p class="mb-0">${data.public_repos}</p>
              </div>
              <div class="px-3">
                 <p class="small text-muted mb-1">Followers</p>
                 <p class="mb-0">${data.followers}</p>
              </div>
              <div>
                 <p class="small text-muted mb-1">public_gists</p>
                 <p class="mb-0">${data.public_gists}</p>
              </div>
           </div>
           <div class="d-flex pt-1">
              <a href="${data.html_url}" type="button" data-mdb-button-init
                 data-mdb-ripple-init
                 class="btn btn-primary flex-grow-1">Xem Chi Tiết</a>
           </div>
        </div>
     </div>
  </div>
          `;
        profile.innerHTML = html;
    }
});
