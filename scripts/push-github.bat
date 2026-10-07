@echo off
rem 一键推送 master 到 GitHub（使用专用 SSH 私钥）
rem 前置：已把 id_ed25519_github.pub 添加到 GitHub，且已创建 public 仓库 Test-Question

setlocal
set GIT_EXE=D:\软件\Git\cmd\git.exe
set KEY=%USERPROFILE%\.ssh\id_ed25519_github

echo [1/3] 测试 GitHub SSH 认证…
"%SystemRoot%\System32\ssh.exe" -i "%KEY%" -o IdentitiesOnly=yes -o StrictHostKeyChecking=accept-new -o ConnectTimeout=20 -T git@github.com
rem GitHub 认证成功时会返回 "Hi xxx!" 并以非 0 退出，属正常现象

echo.
echo [2/3] 推送 master…
set GIT_SSH_COMMAND=ssh -i %KEY% -o IdentitiesOnly=yes -o StrictHostKeyChecking=accept-new
"%GIT_EXE%" -C "%~dp0.." push -u github master
if errorlevel 1 (
    echo.
    echo [失败] 推送未成功。若上面提示 Permission denied ^(publickey^)，
    echo        说明公钥还没加到 GitHub：https://github.com/settings/ssh/new
    echo        若提示 repository not found，说明 Test-Question 仓库还没建。
    pause
    exit /b 1
)

echo.
echo [3/3] 校验远端与本地是否一致…
for /f "tokens=1" %%h in ('"%GIT_EXE%" -C "%~dp0.." rev-parse HEAD') do set LOCAL=%%h
for /f "tokens=1" %%h in ('"%GIT_EXE%" -C "%~dp0.." rev-parse github/master') do set REMOTE=%%h
echo 本地 HEAD          : %LOCAL%
echo 远端 github/master : %REMOTE%

echo.
echo [完成] 代码已推送，Actions 会自动部署。
echo 查看进度： https://github.com/guowang222/Test-Question/actions
echo 线上地址： https://guowang222.github.io/Test-Question/
echo.
echo 若显示 Pages 尚未启用（首次使用需要一次），请打开
echo   https://github.com/guowang222/Test-Question/settings/pages
echo 把 Source 选为 GitHub Actions，保存后 Actions 会自动重跑。
pause
