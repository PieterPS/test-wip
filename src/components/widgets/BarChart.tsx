import * as React from 'react';
import styled from 'styled-components';
import { Bar } from 'react-chartjs-2';
import { Chart } from 'chart.js';

const Container = styled.div`

`;

export interface State {

}

export interface ParentProps {

}

export default class BarChart extends React.Component<ParentProps, State> {
	
	constructor(props: ParentProps) {
		super(props);
	}

	state = {
		canvasHeight: 0,
		hasError: false,
		canvas: null,
		amountOfSteps: 2
	};

	componentWillMount () {
		
		const that = this;
		Chart.elements.Rectangle.prototype.draw = function () {

			const ctx = this._chart.ctx;
			const vm = this._view;
			if (that.state.canvasHeight < vm.base) {
				that.setState({canvasHeight : vm.base });
			}
			let left, right, top, bottom, signX, signY, borderSkipped, radius;
			let borderWidth = vm.borderWidth;
			// Set Radius Here
			// If radius is large enough to cause drawing errors a max radius is imposed
			const cornerRadius = vm.width;
		
			if (!vm.horizontal) {
				// bar
				left = vm.x - vm.width / 2;
				right = vm.x + vm.width / 2;
				top = vm.y;
				bottom = vm.base;
				signX = 1;
				signY = bottom > top ? 1 : -1;
				borderSkipped = vm.borderSkipped || 'bottom';
			} else {
				// horizontal bar
				left = vm.base;
				right = vm.x;
				top = vm.y - vm.height / 2;
				bottom = vm.y + vm.height / 2;
				signX = right > left ? 1 : -1;
				signY = 1;
				borderSkipped = vm.borderSkipped || 'left';
			}
		
			// Canvas doesn't allow us to stroke inside the width so we can
			// adjust the sizes to fit if we're setting a stroke on the line
			if (borderWidth) {
				// borderWidth shold be less than bar width and bar height.
				const barSize = Math.min(Math.abs(left - right), Math.abs(top - bottom));
				borderWidth = borderWidth > barSize ? barSize : borderWidth;
				const halfStroke = borderWidth / 2;
				// Adjust borderWidth when bar top position is near vm.base(zero).
				const borderLeft = left + (borderSkipped !== 'left' ? halfStroke * signX : 0);
				const borderRight = right + (borderSkipped !== 'right' ? -halfStroke * signX : 0);
				const borderTop = top + (borderSkipped !== 'top' ? halfStroke * signY : 0);
				const borderBottom = bottom + (borderSkipped !== 'bottom' ? -halfStroke * signY : 0);
				// not become a vertical line?
				if (borderLeft !== borderRight) {
				top = borderTop;
				bottom = borderBottom;
				}
				// not become a horizontal line?
				if (borderTop !== borderBottom) {
				left = borderLeft;
				right = borderRight;
				}
			}
		
			ctx.beginPath();
			ctx.fillStyle = vm.backgroundColor;
			ctx.strokeStyle = vm.borderColor;
			ctx.lineWidth = borderWidth;
		
			// Corner points, from bottom-left to bottom-right clockwise
			// | 1 2 |
			// | 0 3 |
			const corners = [
				[left, bottom],
				[left, top],
				[right, top],
				[right, bottom]
			];
		
			// Find first (starting) corner with fallback to 'bottom'
			const borders = ['bottom', 'left', 'top', 'right'];
			let startCorner = borders.indexOf(borderSkipped, 0);
			if (startCorner === -1) {
				startCorner = 0;
			}
		
			function cornerAt(index: number) {
				return corners[(startCorner + index) % 4];
			}
		
			// Draw rectangle from 'startCorner'
			let corner = cornerAt(0);
			let width, height, x, y, nextCornerId;
			// tslint:disable-next-line:variable-name
			let x_tl, x_tr, y_tl, y_tr;
			// tslint:disable-next-line:variable-name
			let x_bl, x_br, y_bl, y_br;
			ctx.moveTo(corner[0], corner[1]);
		
			for (let i = 1; i < 4; i++) {
				corner = cornerAt(i);
				nextCornerId = i + 1;
				if (nextCornerId === 4) {
					nextCornerId = 0;
				}
				
				width = corners[2][0] - corners[1][0];
				height = corners[0][1] - corners[1][1];
				x = corners[1][0];
				y = corners[1][1];
		
				radius = cornerRadius / 2;
		
				if (height < 0) {
				// Negative values in a standard bar chart
				x_tl = x; x_tr = x + width;
				y_tl = y + height; y_tr = y + height;
		
				x_bl = x; x_br = x + width;
				y_bl = y; y_br = y;
		
				// Draw
				ctx.moveTo(x_bl + radius, y_bl);
				ctx.lineTo(x_br - radius, y_br);
				ctx.quadraticCurveTo(x_br, y_br, x_br, y_br - radius);
				ctx.lineTo(x_tr, y_tr + radius);
				ctx.quadraticCurveTo(x_tr, y_tr, x_tr - radius, y_tr);
				ctx.lineTo(x_tl + radius, y_tl);
				ctx.quadraticCurveTo(x_tl, y_tl, x_tl, y_tl + radius);
				ctx.lineTo(x_bl, y_bl - radius);
				ctx.quadraticCurveTo(x_bl, y_bl, x_bl + radius, y_bl);
		
				} else if (width < 0) {
					// Negative values in a horizontal bar chart
					x_tl = x + width; x_tr = x;
					y_tl = y; y_tr = y;
			
					x_bl = x + width; x_br = x;
					y_bl = y + height; y_br = y + height;
			
					// Draw
					ctx.moveTo(x_bl + radius, y_bl);
					ctx.lineTo(x_br - radius, y_br);
					ctx.quadraticCurveTo(x_br, y_br, x_br, y_br - radius);
					ctx.lineTo(x_tr, y_tr + radius);
					ctx.quadraticCurveTo(x_tr, y_tr, x_tr - radius, y_tr);
					ctx.lineTo(x_tl + radius, y_tl);
					ctx.quadraticCurveTo(x_tl, y_tl, x_tl, y_tl + radius);
					ctx.lineTo(x_bl, y_bl - radius);
					ctx.quadraticCurveTo(x_bl, y_bl, x_bl + radius, y_bl);
		
				} else {
					ctx.moveTo(x + radius, y);
					ctx.lineTo(x + width - radius, y);
					ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
					ctx.lineTo(x + width, y + height + radius); // set the bottom-right starting pixel
					ctx.lineTo(x, y + height + radius); // set the bottom-left starting pixel
					ctx.lineTo(x, y + radius);
					ctx.quadraticCurveTo(x, y, x + radius, y);
				}
			}
		
			ctx.fill();
			if (borderWidth) {
				ctx.stroke();
			}
			};
	}

	componentDidMount() {
		const that = this;
		Chart.pluginService.register({
			beforeInit: function (chart: any) {
				that.setState({ canvas: chart.canvas});
			}
		});
	}

	getRandomInt = (max: number) => {
		return Math.floor(Math.random() * Math.floor(max));
	}

	populateDataArray = (length: number, max: number) => {
		let tempArr: number[] = [];
		for (var i = 0; i < length; i++) {
			tempArr.push(this.getRandomInt(max));
		}
		return tempArr;
	}

	populateLabelArray(length: number) {
		let tempArr: string[] = [];
		for (var i = 0; i < length; i++) {
			tempArr.push(String(i));
		}
		return tempArr;
	}

	waitAndChange = (prevState) => {
		this.setState({amountOfSteps: this.state.amountOfSteps - 1});
	}

	handleGetGradients = (ctx: any, ) => {
		const colorArrays = {
			redArray : ['#E2223B', '#B31429'],
			blueArray : ['#49BFE0', '#016582'],
			darkBlueArray : ['#045971', '#033c50'],
			bgArray : ['#00283a', '#045971']
		};
		const gradientsArray: any[] = [];

		for (let i = this.state.amountOfSteps - 1; i >= 0; i--) {
			const nthKey = Object.keys(colorArrays)[i];
			const gradient = ctx.createLinearGradient(0, 0, 0, this.state.canvasHeight);
			gradient.addColorStop(0, colorArrays[nthKey[0]]);
			gradient.addColorStop(0.5,  colorArrays[nthKey[0]]);
			{(i === this.state.amountOfSteps - 1) && gradient.addColorStop(0,  colorArrays[nthKey[1]]); }
			gradientsArray.push();
		}

		return gradientsArray;
	}
	allData = (canvas) => {
		const ctx = canvas.getContext('2d');

		// const gradientsArray = this.handleGetGradients(ctx);
		const gradientRejected = ctx.createLinearGradient(0, 0, 0, this.state.canvasHeight);
		gradientRejected.addColorStop(0, '#E2223B');
		gradientRejected.addColorStop(0.5, '#E2223B');
		gradientRejected.addColorStop(1, '#B31429');

		const gradientApproved = ctx.createLinearGradient(0, 0, 0, this.state.canvasHeight);
		gradientApproved.addColorStop(0, '#49BFE0');
		gradientApproved.addColorStop(0.5, '#49BFE0');
		gradientApproved.addColorStop(1, '#016582');

		const gradientPending = ctx.createLinearGradient(0, 0, 0, this.state.canvasHeight);
		gradientPending.addColorStop(0, '#045971');
		gradientPending.addColorStop(0.5, '#045971');
		gradientPending.addColorStop(1, '#033c50');

		const gradientRemaining = ctx.createLinearGradient(0, 0, 0, this.state.canvasHeight);
		gradientRemaining.addColorStop(0, '#00283a');
		gradientRemaining.addColorStop(1, '#045971');

		const dataRejected: number[] = this.populateDataArray(50, 20);
		const dataApproved: number[] = this.populateDataArray(50, 20);
		const dataSubmitted: number[] = this.populateDataArray(50, 20);
		let dataRemainder: number[] = [];
		let dataMaxArray: number[] = [];

		if (dataRejected.length === dataApproved.length && dataSubmitted.length === dataApproved.length) {
			const dataSumArray = dataRejected.map((value, index) => {
				return value + dataApproved[index] + dataSubmitted[index];
			});

			const max = Math.max(...dataSumArray);

			dataRemainder = dataSumArray.map((value, index) => {
				dataMaxArray.push(max + 2);
				return (max + 2) - value;
			});
		} else {
			this.setState({hasError: true});
		}

		const dataSets: any[] = [{
			label: 'Claims Rejected',
			data: dataRejected,
			backgroundColor: gradientRejected,
			hoverBackgroundColor: 'red',
		},
		{
			label: 'Claims Approved',
			data: dataApproved,
			backgroundColor: gradientApproved,
			hoverBackgroundColor: 'blue',
		},
		{
			label: 'Claims Submitted',
			data: dataSubmitted,
			backgroundColor: gradientPending,
			hoverBackgroundColor: 'purple',
		},
		{
			label: 'Total Remainder',
			data: dataRemainder,
			backgroundColor: gradientRemaining,
			hoverBackgroundColor: 'green',
		}];

		if (this.state.amountOfSteps === 2) {
			setTimeout(this.waitAndChange, 1000);
			return {
				labels: this.populateLabelArray(50),
				datasets: [
				{
					label: 'Total Remainder',
					data: dataMaxArray,
					backgroundColor: gradientRemaining,
					hoverBackgroundColor: 'green',
				}]
			};
		}

		return {
			labels: this.populateLabelArray(50),
			datasets: dataSets
		};
	}

	handleReturnData = () => {
				// console.log(this.rejectedData());
				// let theChart = this.refs.chart;
	}

	render() {

		const options = {
			legend: {
				display: false
			},
			scales: {
				xAxes: [{
					stacked: true,
					gridLines: {
						display: false
					},
					ticks: {
						beginAtZero: true,
						display: false
					}
				}],
				yAxes: [{
					stacked: true,
					gridLines: {
						display: false
					},
					ticks: {
						beginAtZero: true
					}
				}]
			}
		};

		this.handleReturnData();

		return (
			<Container className="container-fluid">
				{this.state.hasError ? 'Invalid data sent' :
					<Bar data={this.allData} options={options} />
				}
			</Container>
		);
	}
}