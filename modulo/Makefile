obj-m += timestamps.o
all:
	make -C /lib/modules/$(shell uname -r)/build M=$(shell pwd) 
clean:
	make -C /lib/modules/$(shell uname -r)/build M=$(shell pwd) clean
run:
	sudo insmod timestamps.ko
remove:
	sudo insmod timestamps.ko
