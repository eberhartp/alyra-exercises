pragma solidity 0.5.11;

contract ERC20 {
    // 0x29a0d7a9d228020b6b52ca01a6959fa6035aed0b6b651ed6b95bfe98ef265435
    string public name = "ERC20 Token";
    string public symbol = "E20";
    uint256 public decimals = 18;

    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;
    uint256 private _totalSupply = 100000;

    event Transfer(address indexed from, address indexed to, uint256 amount);
    event Approval(address indexed owner, address indexed spender, uint256 amount);

    constructor() public {
        _balances[msg.sender] = _totalSupply;
    }

    function totalSupply() external view returns(uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) external view returns(uint256) {
        return _balances[account];
    }

    function transfer(address to, uint256 amount) external returns(bool) {
        require(to != address(0), "Sending to null address");
        require(_balances[msg.sender] >= amount, "Insufficient balance");
        _balances[msg.sender] -= amount;
        _balances[to] += amount;
        emit Transfer(msg.sender, to, amount);
        return true;
    }

    function allowance(address owner, address spender) external view returns(uint256) {
        return _allowances[owner][spender];
    }

    function approve(address spender, uint256 amount) external returns(bool) {
        require(spender != address(0), "Approving to zero address");
        _allowances[msg.sender][spender] += amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) external returns(bool) {
        require(_allowances[sender][msg.sender] >= amount, "Insufficient allowance");
        require(_balances[sender] >= amount, "Insufficient balance");
        _balances[sender] -= amount;
        _balances[recipient] += amount;
        emit Transfer(sender, recipient, amount);
        _allowances[sender][msg.sender] -= amount;
        emit Approval(sender, msg.sender, _allowances[sender][msg.sender]);
        return true;
    }
}